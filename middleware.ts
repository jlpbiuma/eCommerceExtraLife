import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'es'],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'en',

  // Domains can be used to configure different locales for different domains
  domains: [
    // {
    //   domain: 'example.com',
    //   defaultLocale: 'en'
    // },
    // {
    //   domain: 'example.es',
    //   defaultLocale: 'es'
    // }
  ]
});

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 