import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import ExchangeCalculator from "@/components/calculators/ExchangeCalculator";
import { Info, Lightbulb } from "lucide-react";
import { generateSEOMetadata, commonKeywords } from "@/lib/seo";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Tools" });

    const keywords = [
        ...(commonKeywords[locale as keyof typeof commonKeywords] || commonKeywords.en),
        locale === "ko" ? "환율계산기" : "exchange rate calculator",
        locale === "ko" ? "환전" : "currency exchange",
        locale === "ko" ? "만원" : "Korean won",
        "USD", "EUR", "JPY", "CNY",
    ];

    return generateSEOMetadata({
        title: `${t("exchangeCalculator")} | K-Life Tools`,
        description: t("exchangeDesc"),
        path: "/tools/exchange-calculator",
        locale,
        keywords,
    });
}

export default function ExchangeCalculatorPage() {
    const t = useTranslations("Tools");

    return (
        <div className="container py-10 px-4">
            <div className="mb-8 space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight">{t("exchangeCalculator")}</h1>
                <p className="text-muted-foreground">
                    {t("exchangeDesc")}
                </p>
            </div>

            <ExchangeCalculator />



            <div className="mt-16 max-w-4xl mx-auto">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="group relative overflow-hidden rounded-2xl border bg-background p-8 hover:shadow-lg transition-all duration-300">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl transition-all group-hover:bg-blue-500/20" />
                        <div className="relative flex flex-col gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                                <Info className="h-6 w-6" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold text-lg">{t("aboutExchangeRates")}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {t("exchangeRateNote")}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="group relative overflow-hidden rounded-2xl border bg-background p-8 hover:shadow-lg transition-all duration-300">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl transition-all group-hover:bg-amber-500/20" />
                        <div className="relative flex flex-col gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400">
                                <Lightbulb className="h-6 w-6" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold text-lg">{t("exchangeTip").split(":")[0]}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {t("exchangeTip").split(":")[1]}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
