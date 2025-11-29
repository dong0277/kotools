import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import VisaCalculator from "@/components/calculators/VisaCalculator";
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
        locale === "ko" ? "비자만료일" : "visa expiry",
        locale === "ko" ? "체류기간" : "stay duration",
        locale === "ko" ? "D-Day" : "D-Day",
        locale === "ko" ? "출입국" : "immigration",
    ];

    return generateSEOMetadata({
        title: `${t("visaCalculator")} | K-Life Tools`,
        description: t("visaDesc"),
        path: "/tools/visa-expiry",
        locale,
        keywords,
    });
}

export default function VisaCalculatorPage() {
    const t = useTranslations("Tools");

    return (
        <div className="container py-10 px-4">
            <div className="mb-8 space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight">{t("visaCalculator")}</h1>
                <p className="text-muted-foreground">
                    {t("visaDesc")}
                </p>
            </div>

            <VisaCalculator />

            <div className="mt-16 max-w-4xl mx-auto space-y-8">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <span className="text-primary">📅</span> {t("aboutVisaExpiry")}
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        {t("visaExpiryImportance")}
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border shadow-sm space-y-2">
                        <div className="text-2xl mb-2">🛫</div>
                        <h3 className="font-semibold">{t("entryDateExplain").replace(":", "")}</h3>
                        <p className="text-sm text-muted-foreground">{t("entryDateDesc")}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border shadow-sm space-y-2">
                        <div className="text-2xl mb-2">⏳</div>
                        <h3 className="font-semibold">{t("durationExplain").replace(":", "")}</h3>
                        <p className="text-sm text-muted-foreground">{t("durationDesc")}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border shadow-sm space-y-2">
                        <div className="text-2xl mb-2">🚫</div>
                        <h3 className="font-semibold">{t("expiryDateExplain").replace(":", "")}</h3>
                        <p className="text-sm text-muted-foreground">{t("expiryDateDesc")}</p>
                    </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-2xl border border-amber-100 dark:border-amber-800/50">
                    <div className="flex gap-3">
                        <span className="text-2xl">⚠️</span>
                        <div className="space-y-2">
                            <h3 className="font-semibold text-amber-900 dark:text-amber-100">{t("visaNote").split(":")[0].replace("* ", "")}</h3>
                            <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
                                {t("visaNote").split(":").slice(1).join(":").trim()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
