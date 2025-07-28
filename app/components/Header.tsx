'use client';

import { useTranslations } from 'next-intl';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { SunIcon, MoonIcon, LanguageIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';

export function Header() {
    const t = useTranslations('common');
    const { isDark, toggleTheme } = useTheme();
    const { currentLocale, changeLanguage } = useLanguage();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent hydration mismatch by not rendering theme-dependent content until mounted
    const themeButton = mounted ? (
        <button
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
            {isDark ? (
                <SunIcon className="h-5 w-5" />
            ) : (
                <MoonIcon className="h-5 w-5" />
            )}
        </button>
    ) : (
        <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <div className="h-5 w-5" />
        </button>
    );

    return (
        <header className="fixed w-full top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        BoardGames
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                        Games
                    </a>
                    <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                        Categories
                    </a>
                    <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                        About
                    </a>
                    <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                        Contact
                    </a>
                </nav>

                {/* Theme and Language Switchers */}
                <div className="flex items-center space-x-4">
                    {/* Theme Toggle */}
                    {themeButton}

                    {/* Language Selector */}
                    <Menu as="div" className="relative">
                        <Menu.Button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                            <LanguageIcon className="h-5 w-5" />
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => changeLanguage('en')}
                                                className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                                    } ${currentLocale === 'en' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'
                                                    } group flex w-full items-center px-4 py-2 text-sm`}
                                            >
                                                {t('language.en')}
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => changeLanguage('es')}
                                                className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''
                                                    } ${currentLocale === 'es' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'
                                                    } group flex w-full items-center px-4 py-2 text-sm`}
                                            >
                                                {t('language.es')}
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </header>
    );
} 