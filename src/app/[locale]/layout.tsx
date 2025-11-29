import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateSEOMetadata, commonKeywords } from "@/lib/seo";
import { WebsiteSchema, OrganizationSchema } from "@/components/StructuredData";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Metadata" });

    return generateSEOMetadata({
        title: t("title"),
        description: t("description"),
        path: "",
        locale,
        keywords: commonKeywords[locale as keyof typeof commonKeywords] || commonKeywords.en,
    });
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={inter.className}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <div className="flex min-h-screen flex-col">
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                </NextIntlClientProvider>
                <WebsiteSchema locale={locale} />
                <OrganizationSchema locale={locale} />
                <Analytics />
            </body>
        </html>
    );
}
