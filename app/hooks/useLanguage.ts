'use client';

import { useRouter, usePathname } from 'next/navigation';

export function useLanguage() {
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = pathname.split('/')[1] || 'en';

  const changeLanguage = (locale: string) => {
    // Get the path segments after the locale
    const segments = pathname.split('/').slice(2);
    
    // Create the new path with the new locale and the rest of the segments
    const newPath = `/${locale}${segments.length > 0 ? '/' + segments.join('/') : ''}`;
    
    router.push(newPath);
  };

  return {
    currentLocale,
    changeLanguage,
  };
} 