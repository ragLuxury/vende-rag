# Features

Each feature is a self-contained vertical slice:

```
features/<feature>/
  domain/
    <entity>.ts            # entity / value object
    <entity>-repository.ts # interface
    errors.ts              # domain-specific errors
  application/
    use-cases/
      <verb>-<noun>.ts     # e.g. add-product-to-cart.ts
    dtos.ts
    query-keys.ts          # TanStack Query keys for this feature
  infrastructure/
    <entity>-http-repository.ts  # implements the domain interface
    schemas.ts                   # Zod schemas for API responses
    mappers.ts                   # API shape -> domain shape
  presentation/
    components/
    hooks/                       # useFooQuery, useBarMutation
```

A feature never imports from another feature. If two features need to share something, lift it to `shared/`.
