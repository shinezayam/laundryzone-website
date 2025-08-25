import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['mn', 'en', 'kr'],
  defaultLocale: 'mn',
  localePrefix: 'always',
  localeDetection: false
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
