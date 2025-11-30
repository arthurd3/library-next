import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function mainMiddleware(request: NextRequest) {

  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const middlewareConfig = {
  matcher: [
    '/',
    '/login/:path*',
    '/user/:path*',
  ],
};