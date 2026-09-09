# Arquitectura — `vende-rag` (Vende Web)

> Estado del arte arquitectónico del **frontend**: estructura, su relación con el API, patrones,
> y puntos fuertes y débiles. Documento de referencia para onboarding y para exponer el proyecto.
>
> Diagramas complementarios (Excalidraw) en `docs/diagrams/`:
> - `vende-clean-architecture.excalidraw` — mapeo de carpetas a las capas de Clean (onion).
> - `vende-request-flow.excalidraw` — flujo de datos front ↔ API de punta a punta.

---

## 1. Panorama general

Portal **web de vendedores** (`vende.rag.mx`): el vendedor sube y gestiona sus productos. **No** es
un carrito de compras. Reemplaza el sitio legacy y **consume el API REST autenticado por JWT**
(`api_rga`, prefijo `/api/web/*`).

### Stack

| Categoría | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Lenguaje | TypeScript strict (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`) |
| Estilos | Tailwind CSS v4 (mobile-first) |
| Estado servidor / cache | TanStack Query v5 |
| Validación en frontera | Zod (runtime, en cada respuesta del API) |
| Testing | Vitest + Testing Library (unit) · Playwright (e2e, fase 2) |
| Calidad | ESLint (`eslint-plugin-boundaries`) + Prettier + lint-staged |

---

## 2. Arquitectura: Clean Architecture **feature-sliced**

```
src/
  shared/                      # transversal
    domain/                    # value objects, errores base
    infrastructure/            # http client, query client, env, imágenes, i18n
    ui/                        # design system (primitivos)
  features/<feature>/          # account, auth, contact, designers, faq, home,
    domain/                    #   info, listings, privacy, product-views, terms
    application/
    infrastructure/
    presentation/
app/                           # SOLO routing — páginas finas que componen features
```

**11 features**: `account`, `auth`, `contact`, `designers`, `faq`, `home`, `info`, `listings`,
`privacy`, `product-views`, `terms`. Cada una es autónoma y se corta en 4 capas.

### Regla de dependencia — **impuesta por ESLint** (`eslint-plugin-boundaries`)

Este es el punto más fuerte: la regla no es solo convención, **la valida el linter**.

| Capa | Puede importar de |
|---|---|
| `domain/` | **nada** (puro) |
| `application/` | `domain/`, `shared-domain` |
| `infrastructure/` | `domain/`, `application/`, `shared-domain`, `shared-infra` |
| `presentation/` | `application/`, `domain/` (solo tipos), `shared-ui`, `shared-domain` |
| `app/` | `presentation/`, `infrastructure`, `shared-ui`, `shared-infra` |

Nunca al revés. Nunca cruzar entre features sin pasar por `shared/`.

---

## 3. Capas y qué contiene cada una

### 🟢 Dominio (`features/*/domain/` + `shared/domain/`)
Entidades, **interfaces de repositorio (puertos)**, tipos y errores de dominio. **Puro**: no importa
de ninguna otra capa. Ej.: `product-view-repository.ts` (interfaz `ProductViewRepository` + tipos
`Product`, `ProductDetail`, `DiscountType`…), `shared/domain/errors.ts`.

### 🔵 Aplicación (`features/*/application/`)
Casos de uso, DTOs y **query keys** de TanStack Query. Ej.: `apply-discount.usecase.ts`,
`remove-discount.usecase.ts`, `product-view-query-keys.ts`. Solo dependen del dominio.

### 🟠 Infraestructura (`features/*/infrastructure/` + `shared/infrastructure/`)
**Implementaciones** de los repositorios (HTTP), **schemas Zod** y mappers de API. Ej.:
`product-view-http-repository.ts` (implementa el puerto llamando al API), `product-view-schemas.ts`
(Zod). En `shared/infrastructure/`: `http/http-client.ts`, `http/token-storage.ts`,
`query/` (QueryClient + provider), `env/env.ts`, `images/`, `i18n/`.

### 🟣 Presentación (`features/*/presentation/` + `shared/ui/`)
Componentes React y **hooks** (wrappers de `useQuery`/`useMutation`). Ej.: `product-detail-screen.tsx`,
`use-apply-discount.ts`. La DI se hace por **React Context**: providers inyectan la implementación del
repositorio (`useProductViewRepository()`), así el hook/usecase depende de la **interfaz**, no del HTTP.

### 🔴 Frameworks / Externa (`app/` + Next.js + React + Navegador + API)
`app/` es **solo routing** (páginas que componen presentación). Fuera del código: Next.js runtime,
el navegador, y el **API REST** que consume.

---

## 4. Relación con el API (`api_rga`)

- **Contrato:** REST JSON sobre `/api/web/*`, autenticado por **JWT Bearer**.
- **HTTP client** (`shared/infrastructure/http/http-client.ts`):
  - Base URL por entorno: `env.server.BACKEND_URL` (SSR) vs `env.NEXT_PUBLIC_BACKEND_URL` (cliente).
  - Adjunta `Authorization: Bearer <token>` leído de **localStorage** (`token-storage.ts`).
  - **Valida cada respuesta con Zod** en la frontera → si el API cambia el shape, falla en runtime
    de forma controlada (`ValidationError`).
  - Errores: `401 → UnauthorizedError`, resto `→ HttpError`.
- **Repository pattern + DI:** `presentation → usecase → interfaz de repo (dominio) → impl HTTP
  (infra)`. La impl se inyecta por contexto.
- **Sesión y auth:**
  - Token en **localStorage**; `AuthGuard` (`require-auth` / `require-guest`) protege las páginas
    client-side y redirige a `/welcome` si no hay sesión completa.
  - **Handler global de 401** (en el QueryClient): limpia sesión y hace `window.location.replace('/welcome')`.
  - Convención de códigos: **401** = sesión inválida/expirada (redirige); **403** = negocio
    (autenticado sin permiso, no redirige).
- **Data fetching:** Server Components para lecturas cacheables/SEO; **TanStack Query** para estado
  mutable del vendedor (subir/editar producto, listados, cuenta).

---

## 5. Patrones implementados (fortalezas)

- ✅ **Clean Architecture estricta y *enforced por ESLint*** (no solo convención).
- ✅ **Feature-sliced**: alta cohesión, features aisladas; cruce solo por `shared/`.
- ✅ **Repository pattern + Inyección de dependencias por Context** → testeable y sustituible.
- ✅ **Zod en la frontera** → seguridad en runtime contra cambios del API.
- ✅ **TypeScript strict** (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`).
- ✅ **Separación clara SSR vs cliente** (Server Components + TanStack Query).
- ✅ **Tests bajo `test/`** espejando `src/` (Vitest solo recoge `test/**`).

---

## 6. Puntos débiles / deuda técnica

1. **Contrato con el API es manual**: los schemas Zod deben mantenerse en sync con las respuestas del
   API. Si el backend cambia un campo, se detecta en **runtime** (no en compilación) → riesgo de drift.
2. **Token en localStorage** (no cookie httpOnly): superficie de XSS y el SSR no puede leer la sesión
   (la protección real es client-side vía `AuthGuard` + handler 401).
3. **Duplicación de layout** en componentes grandes (ej. `product-detail-screen` repite el bloque de
   precio para mobile y desktop).
4. **Lógica que debería vivir en el backend** puede filtrarse al front (ya corregimos el caso de
   marcas excluidas moviéndolo al API); hay que vigilar que las reglas de negocio no se dupliquen aquí.
5. **Sin e2e todavía** (Playwright es fase 2); la cobertura es unit.
6. **Boilerplate por feature**: 4 capas + providers de contexto por repositorio generan varios
   archivos para features simples.

---

## 7. Convenciones (resumen)

- **Named exports** (default solo donde Next lo exige: `page/layout/route/...`).
- **kebab-case** en archivos; componentes `UpperCamelCase` dentro.
- **No `any`**: `unknown` + narrow; validar con Zod en frontera, confiar internamente.
- **Errores**: subclases de `shared/domain/errors.ts`; `catch (unknown)` + `instanceof`.
- **UI en español**; código/identificadores/commits en inglés.
- **Mobile-first**: CSS phone-first, escalar con breakpoints.
- **Tests en `test/`** (nunca colocados junto al código; Vitest solo recoge `test/**`).

---

## 8. Cómo agregar un consumo del API (patrón repetible)

1. **Dominio** — método en la interfaz del repo (`features/<f>/domain/*-repository.ts`) + tipos.
2. **Infra** — impl HTTP (`*-http-repository.ts`) + **schema Zod** (`*-schemas.ts`).
3. **Aplicación** — `*.usecase.ts` que llama la interfaz.
4. **Presentación** — hook (`use-*.ts`) con `useQuery`/`useMutation` (invalida las query keys).
5. **Componente** — consume el hook; UI en `presentation/components/`.
6. **Test** — en `test/features/<f>/...` espejando la ruta.

---

### Resumen en una frase

> **Clean Architecture feature-sliced, estricta y validada por el linter** — más rigurosa que el API
> en cuanto a la regla de dependencia. Consume el API por JWT con **repository pattern + DI + Zod en
> la frontera**. Sus riesgos principales son el **drift del contrato con el API** (validado en runtime,
> no en compilación) y el **token en localStorage**.
