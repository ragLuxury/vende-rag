# Vende RAG

Plataforma para que los vendedores publiquen y administren sus productos. No es un carrito de compras: el usuario llega para **subir lo que quiere vender**, gestionar sus publicaciones y su cuenta. Reemplaza al sitio legado [vende.rag.mx](https://vende.rag.mx/) consumiendo la API JWT existente de RAG.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind v4** — mobile-first
- **TanStack Query v5** — caché y mutaciones en cliente
- **Zod** — validación en runtime en los bordes (API)
- **TypeScript estricto** — `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`
- **Vitest** + Testing Library (unit), **Playwright** (e2e, fase 2)
- **ESLint** (con `eslint-plugin-boundaries`) + **Prettier**
- **Husky** + **lint-staged** + **commitlint**
- **shadcn/ui** como base de primitivos (fase 2)

## Empezar

```bash
# 1. Variables de entorno
cp .env.example .env.local
# Editar .env.local con los valores correctos de tu entorno

# 2. Dependencias
npm install

# 3. Servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### Variables de entorno

| Variable                             | Uso                                                    |
| ------------------------------------ | ------------------------------------------------------ |
| `BACKEND_URL`                        | URL base de la API, solo lado servidor                 |
| `NEXT_PUBLIC_BACKEND_URL`            | URL base de la API expuesta al navegador               |
| `NEXT_PUBLIC_PRODUCT_IMAGE_BASE_URL` | Host de imágenes de producto (cambia entre dev y prod) |

## Scripts

```bash
npm run dev             # servidor de desarrollo
npm run build           # build de producción
npm run start           # servir el build
npm run lint            # ESLint
npm run format          # Prettier --write
npm run format:check    # Prettier --check
npm run typecheck       # tsc --noEmit
npm run test            # Vitest una vez
npm run test:watch      # Vitest en modo watch
npm run test:coverage   # Vitest con cobertura
```

## Arquitectura: Clean Architecture, feature-sliced

```
src/
  shared/                      # transversal
    domain/                    # value objects compartidos, errores base
    infrastructure/            # http client, query client, env, image helper
    ui/                        # design system primitivos
  features/<feature>/          # auth, products, listings, account, ...
    domain/                    # entidades, interfaces de repositorio, errores
    application/               # casos de uso, DTOs, query keys
    infrastructure/            # implementaciones de repositorio, schemas Zod
    presentation/              # componentes, hooks (useQuery/useMutation)
app/                           # solo routing — páginas delgadas que componen features
```

### Regla de dependencias (la hace cumplir ESLint `boundaries`)

| Capa              | Puede importar de                                                             |
| ----------------- | ----------------------------------------------------------------------------- |
| `domain/`         | `shared/domain`                                                               |
| `application/`    | su propio `domain`, `shared/domain`                                           |
| `infrastructure/` | su propio `domain`, su propio `application`, `shared/{domain,infrastructure}` |
| `presentation/`   | su propio `application`, su propio `domain` (tipos), `shared/{ui,domain}`     |
| `app/`            | `presentation/`, `shared/{ui,infrastructure}`                                 |

**Prohibido importar entre features.** Si la feature A necesita algo de la feature B, sube ese código a `shared/`.

## Estrategia de fetching

- **Server Components** para reads SEO-críticos / cacheables (catálogo público, detalle de un producto, categorías). `fetch` con la directiva `use cache` o `<Suspense>`.
- **TanStack Query (cliente)** para estado que el vendedor modifica (subir/editar producto, mis publicaciones, cuenta, filtros del panel).
- **Patrón Repository:** la `presentation` llama un caso de uso → el caso de uso llama la interfaz de repositorio del dominio → la infraestructura la implementa con el HTTP client.
- Toda respuesta de API se valida con **Zod** en el borde de infraestructura.

## Estilo de código

Base: **[Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)**. Las reglas más usadas están documentadas en [`AGENTS.md`](./AGENTS.md). Lo esencial:

- `lowerCamelCase` para variables/funciones, `UpperCamelCase` para tipos/componentes, `CONSTANT_CASE` para constantes inmutables a nivel módulo.
- Archivos en `kebab-case.ts`.
- **No `any`** — usa `unknown` y reduce. Valida con Zod en los bordes.
- **No default exports** salvo en archivos que Next.js lo exige (`page.tsx`, `layout.tsx`, `route.ts`, `middleware.ts`, configs).
- `const` por defecto, `let` solo si reasignas. Nunca `var`.
- `import type` cuando solo se usa como tipo.
- UI en español. Código, identificadores, commits y docs en inglés.
- Mobile-first: escribe el CSS pensando en celular primero y escala con breakpoints de Tailwind.

Sin comentarios salvo para explicar el **porqué** no obvio. Nunca comentes **qué** hace el código.

## Convención de commits

Formato: `<verbo>: <mensaje>` o `<verbo>(<scope>): <mensaje>`. Scope opcional. Lo valida commitlint.

| Verbo          | Cuándo                                      |
| -------------- | ------------------------------------------- |
| `implemented:` | nueva funcionalidad                         |
| `fixed:`       | corrección de bug                           |
| `refactored:`  | cambio interno sin cambio de comportamiento |
| `styled:`      | UI/CSS                                      |
| `documented:`  | docs                                        |
| `tested:`      | tests                                       |
| `chored:`      | tooling, deps, config                       |
| `removed:`     | eliminaciones                               |

Ejemplos:

```
implemented: agregar formulario para subir producto
fixed(listings): el precio no se guardaba al editar
refactored: extraer ProductCard de page.tsx
```

## Hooks de Git

- **`pre-commit`** — corre `lint-staged` (ESLint --fix y Prettier sobre lo staged).
- **`commit-msg`** — corre `commitlint` con la convención de arriba.

Husky se instala automáticamente con `npm install` (vía el script `prepare`).

## Skills de Claude Code

Tres skills viven en `.claude/skills/`:

- **`design-pattern`** — on-demand (`/design-pattern`). Analiza un archivo o feature y propone aplicar un patrón (Strategy, Factory, Adapter, Repository, etc.) **solo si la complejidad lo justifica**. Tiene un check YAGNI integrado: si tres líneas similares son suficientes, no aplica nada.
- **`pattern-review`** — proactivo. Corre vía hook después de cada `Write`/`Edit` en `src/**`. Solo emite sugerencias de **alta confianza** (mínimo tres ramas/duplicados). Por defecto, silencio.
- **`clean-arch-check`** — proactivo. También corre vía hook. Valida que el archivo editado no rompa las reglas de capas (feedback más rápido que ESLint).

Los hooks están definidos en `.claude/settings.json` y apuntan a `.claude/hooks/post-edit-src.sh`.

## Estructura del proyecto

```
├── app/                     # routing de Next.js (App Router)
├── src/
│   ├── shared/              # capa transversal
│   └── features/            # features verticales (clean architecture)
├── public/                  # assets estáticos
├── .claude/                 # skills, hooks y settings de Claude Code
├── .husky/                  # git hooks
├── AGENTS.md                # convenciones del proyecto (lo leen los agentes IA)
├── CLAUDE.md                # importa AGENTS.md
├── commitlint.config.ts     # verbos de commit personalizados
├── eslint.config.mjs        # ESLint con reglas Google + boundaries
├── next.config.ts           # config de Next.js (image remotePatterns)
├── tsconfig.json            # TypeScript estricto
└── vitest.config.ts         # Vitest + jsdom
```

## Documentación de Next.js 16

Esta versión de Next.js trae cambios que pueden no estar en los datos de entrenamiento de los agentes. Los docs versionados están en `node_modules/next/dist/docs/`. Léelos antes de escribir código de Next. La instrucción está en `AGENTS.md`.
