import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// const protectedRoutes = ['/dashboard'];
// const publicRoutes = ['/login', '/signup', '/'];

export default async function middleware(req: NextRequest) {
  console.log(req.url);
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  console.log('----', path);
  //   const isProtectedRoute = protectedRoutes.includes(path);
  //   const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const jwt = (await cookies()).get('token')?.value;
  console.log(jwt);
  // 4. Redirect to /login if the user is not authenticated
  //   if (isProtectedRoute && !session?.token) {
  //     return NextResponse.redirect(new URL('/login', req.nextUrl));
  //   }

  // 5. Redirect to /dashboard if the user is authenticated
  //   if (
  //     isPublicRoute &&
  //     session?.userId &&
  //     !req.nextUrl.pathname.startsWith('/dashboard')
  //   ) {
  //     return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  //   }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
