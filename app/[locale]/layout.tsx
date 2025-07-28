import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from '../providers/ThemeProvider';
import { Header } from '../components/Header';
import { Providers } from './providers';
import { locales } from '../../i18n.config';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Board Games E-commerce',
    description: 'Find your next favorite board game',
};

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

async function getMessages(locale: string) {
    try {
        return (await import(`../../messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const isValidLocale = locales.includes(locale as any);

    if (!isValidLocale) {
        notFound();
    }

    const messages = await getMessages(locale);

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={inter.className} suppressHydrationWarning>
                <Providers>
                    <NextIntlClientProvider locale={locale} messages={messages}>
                        <ThemeProvider>
                            <main className="min-h-screen transition-colors duration-200 bg-background">
                                <Header />
                                {children}
                            </main>
                        </ThemeProvider>
                    </NextIntlClientProvider>
                </Providers>
            </body>
        </html>
    );
} 