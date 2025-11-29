import { useTranslations } from "next-intl";

export default function PrivacyPage() {
    const t = useTranslations("Common");
    const tLegal = useTranslations("Legal");

    return (
        <div className="container py-10 px-4 max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight mb-6">{t("privacyPolicy")}</h1>
            <div className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                    {tLegal("lastUpdated", { year: new Date().getFullYear() })}
                </p>
                <p>
                    {tLegal("privacyPlaceholder")}
                </p>
                <h2>{tLegal("infoCollectTitle")}</h2>
                <p>
                    {tLegal("infoCollectContent")}
                </p>
                <h2>{tLegal("useInfoTitle")}</h2>
                <p>
                    {tLegal("useInfoContent")}
                </p>
            </div>
        </div>
    );
}
