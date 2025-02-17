import { LRUCache } from 'lru-cache';

type RateLimitOptions = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export default function rateLimit(options?: RateLimitOptions) {
  // The cache stores the usage count per token as a number.
  const tokenCache = new LRUCache<string, number>({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: (limit: number, token: string) => {
      const tokenCount = tokenCache.get(token) || 0;
      const newCount = tokenCount + 1;
      tokenCache.set(token, newCount);

      // If the request count exceeds the limit, it is considered rate limited.
      const isRateLimited = newCount >= limit;
      const headers = new Headers();
      headers.set('x-ratelimit-limit', limit.toString());
      headers.set('x-ratelimit-remaining', isRateLimited ? '0' : (limit - newCount).toString());

      return { isRateLimited, headers };
    },
  };
}
