import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/login', '/register'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isPublicRoute = publicRoutes.includes(path);
  if (isPublicRoute) {
    return NextResponse.next();
  }
  const jwt = (await cookies()).get('jwt')?.value;

  if (!isPublicRoute && !jwt) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on static files
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png|svg$).*)'],
};
