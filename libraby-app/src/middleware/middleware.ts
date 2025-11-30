import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

  if (request.nextUrl.pathname === '/' || request.nextUrl.pathname === '') {
    console.log('Redirecionando / para /login');
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login/:path*',
    '/user/:path*',
  ],
}; 