# next-path-matcher

A tiny utility to match Next.js request paths using glob patterns or regular expressions. Built for use with Next.js middleware and API routes, leveraging [`path-to-regexp`](https://github.com/pillarjs/path-to-regexp) for flexible pattern matching.

## Features

- Match Next.js request paths using glob-like patterns or RegExp
- Supports wildcards and parameterized routes
- TypeScript support out of the box
- Simple API for use in middleware or custom logic

## Installation

```bash
npm install next-path-matcher
```

## Usage

```ts
import { createPathMatcher } from 'next-path-matcher';
import { NextRequest } from 'next/server';

const isPublicRoute = createPathMatcher(['/', '/sign-in(.*)', '/sign-up(.*)']);
const isPrivateRoute = createPathMatcher(['/dashboard']);

export function middleware(req: NextRequest) {
  if (isPublicRoute(req)) {
    // ...your logic here...
  }

  if (isPrivateRoute(req)) {
    // ...your logic here...
  }
  // ...
}
```

### Supported Patterns

- **Glob-like strings**: `/api/(.*)`, `/dashboard(.*)`
- **Regular expressions**: `/^\/user\/[a-zA-Z0-9_-]+$/`

See [`path-to-regexp` documentation](https://github.com/pillarjs/path-to-regexp/tree/6.x) for advanced pattern syntax.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
