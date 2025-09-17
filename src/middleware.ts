import { NextRequest, NextResponse } from 'next/server';

// Protect all routes except /login and /_next/static/*
export function middleware(req: NextRequest) {
  const isAuth = false; // Lockout: no one is authenticated
  const publicPaths = ['/login', '/_next', '/favicon.ico'];
  const { pathname } = req.nextUrl;

  if (publicPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  if (!isAuth) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};
