import rateLimit from '@/utils/rate-limit';
import { NextResponse } from 'next/server';

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Maximum of 500 users
});

export async function GET() {
  // Limit to 5 requests per minute per token
  const { isRateLimited, headers } = limiter.check(5, 'CACHE_TOKEN');

  if (isRateLimited) {
    return NextResponse.json({ error: 'Too Many Requests' }, { status: 429, headers: headers });
  }

  return NextResponse.json({ id: crypto.randomUUID() }, { status: 200, headers: headers });
}
