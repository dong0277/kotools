import { useTranslations } from "next-intl";
import SalaryCalculator from "@/components/calculators/SalaryCalculator";

export default function SalaryCalculatorPage() {
    const t = useTranslations("Tools");

    return (
        <div className="container py-10 px-4">
            <div className="mb-8 space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight">{t("salaryCalculator")}</h1>
                <p className="text-muted-foreground">
                    {t("salaryDesc")}
                </p>
            </div>

            <SalaryCalculator />

            <div className="mt-16 max-w-4xl mx-auto space-y-8">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <span className="text-primary">💰</span> {t("howCalculated")}
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        {t("calcBasis")}
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border shadow-sm space-y-2">
                        <div className="text-2xl mb-2">🏛️</div>
                        <h3 className="font-semibold">{t("nationalPension")}</h3>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border shadow-sm space-y-2">
                        <div className="text-2xl mb-2">🏥</div>
                        <h3 className="font-semibold">{t("healthInsurance")}</h3>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border shadow-sm space-y-2">
                        <div className="text-2xl mb-2">🧓</div>
                        <h3 className="font-semibold">{t("longTermCare")}</h3>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border shadow-sm space-y-2">
                        <div className="text-2xl mb-2">💼</div>
                        <h3 className="font-semibold">{t("employmentInsurance")}</h3>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border shadow-sm space-y-2">
                        <div className="text-2xl mb-2">📊</div>
                        <h3 className="font-semibold">{t("incomeTax")}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
