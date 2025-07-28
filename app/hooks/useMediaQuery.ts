'use client';

import { useState, useEffect } from 'react';

type BreakPoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export function useMediaQuery(breakpoint: BreakPoint = 'md') {
  const [isMobile, setIsMobile] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const mediaQuery = window.matchMedia(`(min-width: ${breakpoints[breakpoint]})`);
    
    const updateTarget = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(!e.matches);
    };

    // Check initial
    updateTarget(mediaQuery);

    // Add listener
    if (mediaQuery.addListener) {
      mediaQuery.addListener(updateTarget);
    } else {
      mediaQuery.addEventListener('change', updateTarget);
    }

    return () => {
      // Remove listener
      if (mediaQuery.removeListener) {
        mediaQuery.removeListener(updateTarget);
      } else {
        mediaQuery.removeEventListener('change', updateTarget);
      }
    };
  }, [breakpoint]);

  // Return false during SSR
  if (!isClient) return true;

  return isMobile;
} 