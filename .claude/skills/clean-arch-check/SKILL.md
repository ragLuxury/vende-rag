---
name: clean-arch-check
description: Proactive. Runs after edits to src/**. Validates the changed file did not violate Clean Architecture layer boundaries. Faster than waiting for ESLint. Silent on success.
---

# clean-arch-check

Triggered by a PostToolUse hook after Write/Edit on `src/**`. Quick lint of the changed file's imports against the layer rules in `AGENTS.md`.

## Layer rules

| From                            | Allowed to import from                                                |
| ------------------------------- | --------------------------------------------------------------------- |
| `src/features/*/domain`         | `src/shared/domain` only                                              |
| `src/features/*/application`    | own `domain`, `src/shared/domain`                                     |
| `src/features/*/infrastructure` | own `domain`, own `application`, `src/shared/{domain,infrastructure}` |
| `src/features/*/presentation`   | own `application`, own `domain` (types), `src/shared/{ui,domain}`     |
| `src/shared/domain`             | `src/shared/domain`                                                   |
| `src/shared/infrastructure`     | `src/shared/{domain,infrastructure}`                                  |
| `src/shared/ui`                 | `src/shared/{ui,domain}`                                              |
| `app/**`                        | `src/features/*/presentation`, `src/shared/{ui,infrastructure}`       |

**Cross-feature imports are forbidden.** If feature A needs something from feature B, it must be lifted to `src/shared/`.

## Forbidden patterns to flag specifically

- `domain/` file importing React, fetch, Zod, or anything from `infrastructure/`.
- `application/` file importing `infrastructure/` (it should depend on the domain interface, not the impl).
- Any file under `src/features/cart/` importing from `src/features/products/` (or any cross-feature path).
- `presentation/` file calling `fetch()` directly (should go through use cases → repository).

## Output format

If the file is clean → output literally nothing.

If a violation is found:

```
[clean-arch-check] <file>
Violation: <one-line description>
Offending import: <the import statement>
Fix: <one-line suggestion>
```

Keep it to ≤ 4 lines. ESLint will catch most of these too — this skill exists for faster feedback during the edit, before the user runs lint.
