import { useTranslations } from "next-intl";

export default function TermsPage() {
    const t = useTranslations("Common");
    const tLegal = useTranslations("Legal");

    return (
        <div className="container py-10 px-4 max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight mb-6">{t("termsOfService")}</h1>
            <div className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                    {tLegal("lastUpdated", { year: new Date().getFullYear() })}
                </p>
                <p>
                    {tLegal("termsPlaceholder")}
                </p>
                <h2>{tLegal("acceptanceTitle")}</h2>
                <p>
                    {tLegal("acceptanceContent")}
                </p>
                <h2>{tLegal("licenseTitle")}</h2>
                <p>
                    {tLegal("licenseContent")}
                </p>
            </div>
        </div>
    );
}
