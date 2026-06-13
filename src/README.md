# `src/` — Clean Architecture, feature-sliced

## Layers

| Layer            | Imports from                                      | Purpose                                                                     |
| ---------------- | ------------------------------------------------- | --------------------------------------------------------------------------- |
| `domain`         | nothing                                           | Entities, value objects, repository **interfaces**, domain errors. Pure TS. |
| `application`    | `domain`                                          | Use cases, DTOs, TanStack Query keys. Orchestrates domain.                  |
| `infrastructure` | `domain`, `application`, `shared`                 | Repository **implementations**, HTTP calls, Zod schemas, mappers.           |
| `presentation`   | `application`, `domain` (types only), `shared/ui` | React components, hooks wrapping use cases.                                 |

## Folders

- `shared/` — cross-cutting concerns shared by all features.
  - `domain/` — base value objects, base errors.
  - `infrastructure/http` — the typed HTTP client + JWT interceptor.
  - `infrastructure/query` — TanStack Query client + provider.
  - `infrastructure/env` — typed env vars.
  - `infrastructure/images` — product image URL helper.
  - `ui/` — design system primitives.
- `features/<feature>/` — one folder per business capability (cart, products, checkout, auth).

## Rules

- ESLint `boundaries` plugin enforces the dependency direction. Violations fail the build.
- No cross-feature imports — go through `shared/`.
- `app/` only imports from `presentation/` and `shared/ui`. It's a routing layer, nothing more.
