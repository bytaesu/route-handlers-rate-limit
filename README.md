# Route Handlers Rate Limit

This example uses `lru-cache` to implement a simple rate limiter for `Next.js Route Handlers`, referencing the [Vercel example](https://github.com/vercel/next.js/tree/canary/examples/api-routes-rate-limit).

### Dependencies
- Next 15
- React 19
- lru-cache 11

### Structure
- `src/utils/rate-limit.ts` : This file defines a utility function to handle rate limiting using LRUCache.
- `src/app/api/test/route.ts` : This file defines a Next.js Route Handler that applies rate limiting through the utility function.

### Limitation
Suitable for simple use cases. It is not recommended for distributed environments or more complex rate limiting requirements. For distributed environments, consider using external caching solutions like Redis.
