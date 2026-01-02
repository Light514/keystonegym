import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip locale handling for API routes and static files
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next();
  }

  // Extract locale from path or use default
  const localeMatch = pathname.match(/^\/(en|fr)/);
  const locale = localeMatch ? localeMatch[1] : routing.defaultLocale;

  // Check if this is a protected dashboard route
  const pathWithoutLocale = pathname.replace(/^\/(en|fr)/, '') || '/';
  const isDashboard = pathWithoutLocale.startsWith('/dashboard');

  // Only check auth for dashboard routes
  if (isDashboard) {
    try {
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return request.cookies.getAll();
            },
            setAll() {
              // No-op for middleware - cookies handled by response
            },
          },
        }
      );

      const { data: { user } } = await supabase.auth.getUser();

      // Redirect to login if not authenticated
      if (!user) {
        const url = request.nextUrl.clone();
        url.pathname = `/${locale}/auth/login`;
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
      }
    } catch (error) {
      // If auth check fails, redirect to login
      console.error('Auth check failed:', error);
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/auth/login`;
      return NextResponse.redirect(url);
    }
  }

  // Apply i18n middleware for all other routes
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/(fr|en)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ],
};
