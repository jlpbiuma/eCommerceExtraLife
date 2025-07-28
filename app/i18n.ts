import {getRequestConfig} from 'next-intl/server';
import {locales, defaultLocale, type Locale} from '../i18n.config';
 
export default getRequestConfig(async ({locale}) => {
  // Ensure we have a valid locale
  const resolvedLocale = (locales.includes(locale as Locale) ? locale : defaultLocale) as Locale;

  return {
    messages: (await import(`../messages/${resolvedLocale}.json`)).default,
    locale: resolvedLocale // Now TypeScript knows this is a valid locale
  };
}); 