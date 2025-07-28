'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
    const t = useTranslations('auth');
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;

        if (password !== confirmPassword) {
            setError(t('register.error.passwords_dont_match'));
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    firstName,
                    lastName,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || t('register.error.generic'));
            }

            router.push('/auth/login?registered=true');
        } catch (error) {
            setError(error instanceof Error ? error.message : t('register.error.generic'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-background">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>{t('register.title')}</CardTitle>
                    <CardDescription>
                        {t('register.subtitle')}{' '}
                        <Link
                            href="/auth/login"
                            className="font-medium text-primary hover:text-primary/90"
                        >
                            {t('register.login_link')}
                        </Link>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">{t('register.first_name_label')}</Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    required
                                    placeholder={t('register.first_name_placeholder')}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lastName">{t('register.last_name_label')}</Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    required
                                    placeholder={t('register.last_name_placeholder')}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">{t('register.email_label')}</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder={t('register.email_placeholder')}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">{t('register.password_label')}</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                placeholder={t('register.password_placeholder')}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">
                                {t('register.confirm_password_label')}
                            </Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                placeholder={t('register.confirm_password_placeholder')}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? t('register.loading') : t('register.submit')}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
} 