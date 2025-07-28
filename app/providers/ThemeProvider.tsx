'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface ThemeProviderProps {
    children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            enableColorScheme={false}
            storageKey="board-games-theme"
            themes={['light', 'dark']}
        >
            <div suppressHydrationWarning>
                {children}
            </div>
        </NextThemesProvider>
    );
} 