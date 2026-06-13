<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# vende-rag

Platform where sellers upload and manage the products they want to sell. It is **not** a shopping-cart / buyer storefront: the primary user is a seller listing their inventory, editing it, and managing their account. Replaces the legacy site at https://vende.rag.mx/. Consumes the existing JWT-authenticated RAG backend API. Two-person MX team.

## Stack

- Next.js 16 (App Router) + React 19
- Tailwind v4 (mobile-first; must look good on phones first, scale up)
- TanStack Query v5 (client cache, mutations)
- Zod (runtime validation at API boundaries)
- TypeScript strict (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`)
- Vitest + Testing Library (unit), Playwright (e2e, phase 2)
- ESLint (with `eslint-plugin-boundaries`) + Prettier
- Husky + lint-staged + commitlint
- shadcn/ui as component primitives base (phase 2)

## Architecture: Clean Architecture, feature-sliced

```
src/
  shared/                    # cross-cutting
    domain/                  # shared value objects, base errors
    infrastructure/          # http client, query client, env, image helper
    ui/                      # design system primitives
  features/<feature>/        # auth, products, listings, account, ...
    domain/                  # entities, repo interfaces, domain errors
    application/             # use cases, DTOs, query keys
    infrastructure/          # repo impls, Zod schemas, API mappers
    presentation/            # components, hooks (useQuery/useMutation wrappers)
app/                         # routing only — thin pages composing features
```

**Dependency rule (enforced by ESLint boundaries):**

- `domain/` imports from: nothing (pure)
- `application/` imports from: `domain/`
- `infrastructure/` imports from: `domain/`, `application/`, `shared/`
- `presentation/` imports from: `application/`, `domain/` (read-only types), `shared/ui`
- `app/` imports from: `presentation/`, `shared/ui`
- Never reverse. Never cross-feature without going through `shared/`.

## Data fetching strategy

- **Server Components** for SEO-critical / cacheable reads (public catalog, product detail, categories). Use `fetch` + `use cache` directive, or `<Suspense>`.
- **TanStack Query (client)** for seller-mutable state (upload / edit product, my listings, account, dashboard filters). Hydrate from server when prefetched.
- Repository pattern: presentation calls use cases → use cases call domain repo interface → infrastructure implements with HTTP client.
- All API responses validated with Zod at the infrastructure boundary.

## Commit conventions (custom, scope optional)

Format: `<verb>: <message>` or `<verb>(<scope>): <message>`

Verbs:

- `implemented:` new feature/capability
- `fixed:` bug fix
- `refactored:` code change, no behavior change
- `styled:` UI/CSS only
- `documented:` docs only
- `tested:` tests only
- `chored:` tooling, deps, config
- `removed:` deletions

Enforced by commitlint. English. Imperative mood after the verb.

## Code style — Google TypeScript Style Guide

Baseline: **[Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)**. Read it. The rules below are the high-frequency ones plus project-specific carve-outs.

### Naming

- `lowerCamelCase` — variables, functions, methods, parameters, properties.
- `UpperCamelCase` — classes, types, interfaces, enums, type parameters, React components.
- `CONSTANT_CASE` — module-level constants that are truly immutable primitives (e.g. `MAX_RETRIES = 3`). **Not** for objects/arrays.
- `kebab-case.ts` — file names. React component files: `kebab-case.tsx`, default-exported component is `UpperCamelCase` inside.
- No `I` prefix on interfaces. No `T` prefix on types. No Hungarian.
- Booleans read as predicates: `isLoading`, `hasError`, `canEdit`.

### Types

- **No `any`.** Use `unknown` and narrow. Validate at boundaries with Zod, trust internally.
- Prefer `interface` for object shapes that may be extended/implemented; `type` for unions, intersections, mapped/conditional types.
- Mark immutability: `readonly` on fields, `ReadonlyArray<T>` / `readonly T[]` on collections that callers must not mutate.
- Avoid type assertions (`as Foo`) — narrow with type guards. Casts to `unknown` first only at trust boundaries.
- Function return types: explicit on **exported / public** functions; inferred is fine for local arrow functions.

### Variables & functions

- `const` by default, `let` only when reassigning. Never `var`.
- Arrow functions for callbacks and inline. Named `function` declarations for top-level exports (better stack traces).
- Default parameters at the end of the param list. Prefer single object param when ≥ 3 args.
- No parameter mutation. No reassignment of imports.

### Modules & imports

- **Named exports preferred.** Default exports are forbidden **except** where Next.js requires them: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `template.tsx`, `default.tsx`, `route.ts`, `middleware.ts`, `instrumentation.ts`, and `next.config.ts`.
- One concept per file. File name matches the primary export.
- Import order: `node:` builtins → third-party → `@/` aliases → relative. Blank line between groups (Prettier handles).
- No circular imports. No barrel `index.ts` re-exports across layers — they break tree-shaking and hide the dependency graph.

### Control flow & errors

- Prefer early returns over nested conditionals.
- `switch` must be exhaustive on discriminated unions — use `never`-typed `default` to enforce.
- Throw `Error` subclasses from `src/shared/domain/errors.ts`. Never throw strings or plain objects.
- Catch `unknown`, narrow with `instanceof`. Don't swallow errors silently.

### Formatting (Prettier-enforced)

- Single quotes, semicolons, trailing commas, 100-col width, 2-space indent.

### Comments

- No comments unless the WHY is non-obvious. Never comment WHAT.
- JSDoc only on exported public APIs (`/** ... */`) — focus on contract and constraints, not restating the signature.
- No `// TODO` without an owner + issue link. No `// removed:` trailing notes.

### Project-specific

- No premature abstraction. Three similar lines beats a wrong abstraction.
- No backwards-compat shims, no dead `_unused` vars.
- No `console.log` in committed code. Use a logger if it matters.
- UI copy in Spanish. Code, identifiers, commits, docs in English.
- Mobile-first: design and write CSS phone-first, scale up with Tailwind breakpoints.

### Carve-outs from Google's guide

- **Default exports are allowed only for Next.js file conventions** (listed above). Everything else: named exports.
- Google forbids namespace imports for project code; we allow `import * as z from 'zod'` style for libraries that publish it that way.

## When to apply design patterns

Don't reach for patterns proactively. The `/design-pattern` skill is the on-demand entry point. The `pattern-review` skill flags only high-confidence pattern smells after edits. Both refuse to apply patterns where YAGNI applies.
