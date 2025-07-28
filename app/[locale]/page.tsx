'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Squares2X2Icon, ShieldCheckIcon, TruckIcon } from '@heroicons/react/24/outline';

export default function LandingPage() {
    const t = useTranslations('landing');

    return (
        <main>
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center">
                <div className="absolute inset-0 overflow-hidden">
                    <Image
                        src="/images/hero-bg.jpg"
                        alt="Board games background"
                        fill
                        className="object-cover transition-opacity duration-200 opacity-30 dark:opacity-20"
                        priority
                    />
                </div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-5xl md:text-6xl font-bold transition-colors duration-200 text-slate-900 dark:text-slate-50 mb-6">
                        {t('hero.title')}
                    </h1>
                    <p className="text-xl md:text-2xl transition-colors duration-200 text-slate-700 dark:text-slate-300 mb-8">
                        {t('hero.subtitle')}
                    </p>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200">
                        {t('hero.cta')}
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 transition-colors duration-200 bg-slate-100 dark:bg-slate-800">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center transition-colors duration-200 text-slate-900 dark:text-slate-50 mb-12">
                        {t('features.title')}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Squares2X2Icon className="h-8 w-8" />}
                            title={t('features.selection.title')}
                            description={t('features.selection.description')}
                        />
                        <FeatureCard
                            icon={<ShieldCheckIcon className="h-8 w-8" />}
                            title={t('features.quality.title')}
                            description={t('features.quality.description')}
                        />
                        <FeatureCard
                            icon={<TruckIcon className="h-8 w-8" />}
                            title={t('features.shipping.title')}
                            description={t('features.shipping.description')}
                        />
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center transition-colors duration-200 text-slate-900 dark:text-slate-50 mb-12">
                        {t('categories.title')}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {['strategy', 'family', 'party', 'card', 'cooperative'].map((category) => (
                            <CategoryCard
                                key={category}
                                title={t(`categories.${category}`)}
                                image={`/images/categories/${category}.jpg`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 transition-colors duration-200 bg-indigo-600 dark:bg-indigo-700">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        {t('newsletter.title')}
                    </h2>
                    <p className="text-indigo-100 mb-8">
                        {t('newsletter.description')}
                    </p>
                    <form className="flex flex-col md:flex-row gap-4 justify-center">
                        <input
                            type="email"
                            placeholder={t('newsletter.placeholder')}
                            className="px-4 py-3 rounded-lg flex-grow max-w-md transition-colors duration-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 placeholder-slate-500 dark:placeholder-slate-400"
                        />
                        <button
                            type="submit"
                            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold transition-colors duration-200 hover:bg-indigo-50 dark:hover:bg-slate-100"
                        >
                            {t('newsletter.button')}
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
}

function FeatureCard({ icon, title, description }: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="transition-colors duration-200 bg-white dark:bg-slate-700 p-6 rounded-xl shadow-lg text-center">
            <div className="text-indigo-600 dark:text-indigo-400 mb-4 flex justify-center transition-colors duration-200">
                {icon}
            </div>
            <h3 className="text-xl font-semibold transition-colors duration-200 text-slate-900 dark:text-slate-50 mb-2">
                {title}
            </h3>
            <p className="transition-colors duration-200 text-slate-600 dark:text-slate-300">
                {description}
            </p>
        </div>
    );
}

function CategoryCard({ title, image }: { title: string; image: string }) {
    return (
        <div className="relative group overflow-hidden rounded-lg aspect-square">
            <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-all duration-200 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 transition-opacity duration-200">
                <h3 className="text-white font-semibold">{title}</h3>
            </div>
        </div>
    );
} 