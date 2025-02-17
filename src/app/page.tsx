'use client';

import { useState } from 'react';

/**
 * Demo page.
 */
export default function Home() {
  const [response, setResponse] = useState<Record<string, unknown> | null>(null);

  const makeRequest = async () => {
    const res = await fetch('/api/test');

    setResponse({
      status: res.status,
      body: await res.json(),
      limit: res.headers.get('x-ratelimit-limit'),
      remaining: res.headers.get('x-ratelimit-remaining'),
    });
  };

  return (
    <div className="flex justify-center p-6 md:p-20">
      <div className="flex flex-col items-start justify-center max-w-sm gap-4">
        <h1 className="text-3xl font-semibold">
          <span className="block">Next.js Route Handlers</span>
          <span className="block">Rate Limiting</span>
        </h1>
        <p>
          This example uses <strong className="font-mono">lru-cache</strong> to implement a simple
          rate limiter for <strong className="font-mono">Route Handlers</strong>.
        </p>
        <button
          onClick={() => makeRequest()}
          className="border border-blue-400 rounded-lg px-4 py-2 shadow-lg font-mono bg-blue-200 active:scale-95 transition-transform"
        >
          Make Request
        </button>
        {response && (
          <div className="bg-neutral-700 text-white p-4 mt-4 text-sm rounded-lg w-full max-w-sm overflow-x-auto">
            <pre className="whitespace-pre-wrap break-words">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
