import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { IUserInfo } from './app/(private)/shared/types';
import { fetchApi } from './app/(private)/utils/api';

const publicRoutes = ['/login', '/register'];
// routes not declared here are available to ALL
const roleProtectedRoutes: Record<string, string[]> = {
  '/campaigns': ['Advertiser'],
  '/landers': ['Advertiser'],
  '/clients': ['Admin'],
  '/users': ['Admin'],
  '/traffic-sources': ['Publisher'],
  '/sub-sources': ['Publisher'],
  '/placements': ['Publisher'],
};
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isPublicRoute = publicRoutes.includes(path);
  if (isPublicRoute) return NextResponse.next();

  const jwtToken = (await cookies()).get('jwt')?.value;
  if (!isPublicRoute && !jwtToken) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  /**
   * Role Based Routes: Admin Access All
   * Publisher/Advertiser follow the rules
   */
  const userInfo = await fetchApi<IUserInfo>('/auth/info', {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  if (userInfo.role == 'Admin') return NextResponse.next();

  const route = Object.keys(roleProtectedRoutes).find(
    (route) => path.indexOf(route) > -1,
  );

  if (!route) return NextResponse.next();
  const allowedRolesForRoute = roleProtectedRoutes[route];
  if (allowedRolesForRoute.includes(userInfo.role)) return NextResponse.next();

  return NextResponse.rewrite(new URL('/404', req.nextUrl));
}

// Routes Middleware should not run on static files
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
};
