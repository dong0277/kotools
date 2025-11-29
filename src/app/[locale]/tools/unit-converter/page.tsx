import { useTranslations } from "next-intl";
import UnitConverter from "@/components/calculators/UnitConverter";

export default function UnitConverterPage() {
    const t = useTranslations("Tools");

    return (
        <div className="container py-10 px-4">
            <div className="mb-8 space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight">{t("unitConverter")}</h1>
                <p className="text-muted-foreground">
                    {t("unitDesc")}
                </p>
            </div>

            <UnitConverter />

            <div className="mt-16 max-w-3xl mx-auto space-y-8">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <span className="text-primary">📚</span> {t("aboutUnit")}
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        {t("unitExplanation")}
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-center space-y-1">
                        <div className="text-sm text-muted-foreground">1 {t("pyeongLabel")}</div>
                        <div className="text-xl font-bold text-primary">3.3058 m²</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-center space-y-1">
                        <div className="text-sm text-muted-foreground">1 {t("pyeongLabel")}</div>
                        <div className="text-xl font-bold text-primary">35.58 ft²</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-center space-y-1">
                        <div className="text-sm text-muted-foreground">{t("standardApt")}</div>
                        <div className="text-xl font-bold text-primary">109 m²</div>
                        <div className="text-xs text-muted-foreground">{t("supplyArea")}</div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <span className="text-primary">🏠</span> {t("recommendationTitle")}
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border shadow-sm space-y-2">
                            <div className="text-2xl mb-2">👤</div>
                            <h3 className="font-semibold">{t("singleHousehold")}</h3>
                            <div className="text-xl font-bold text-primary">{t("singleSize")}</div>
                            <p className="text-sm text-muted-foreground">{t("singleDesc")}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border shadow-sm space-y-2">
                            <div className="text-2xl mb-2">👫</div>
                            <h3 className="font-semibold">{t("coupleHousehold")}</h3>
                            <div className="text-xl font-bold text-primary">{t("coupleSize")}</div>
                            <p className="text-sm text-muted-foreground">{t("coupleDesc")}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border shadow-sm space-y-2">
                            <div className="text-2xl mb-2">👨‍👩‍👧‍👦</div>
                            <h3 className="font-semibold">{t("familyHousehold")}</h3>
                            <div className="text-xl font-bold text-primary">{t("familySize")}</div>
                            <p className="text-sm text-muted-foreground">{t("familyDesc")}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/50">
                    <div className="flex gap-3">
                        <span className="text-2xl">💡</span>
                        <div className="space-y-2">
                            <h3 className="font-semibold text-blue-900 dark:text-blue-100">{t("didYouKnow")}</h3>
                            <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                                {t("unitNote")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
