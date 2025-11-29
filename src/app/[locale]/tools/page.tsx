import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Calculator, Coins, Calendar, Building2 } from "lucide-react";
import { generateSEOMetadata, commonKeywords } from "@/lib/seo";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Tools" });

    return generateSEOMetadata({
        title: `${locale === "ko" ? "도구" : "Tools"} | K-Life Tools`,
        description: t("essentialTools"),
        path: "/tools",
        locale,
        keywords: commonKeywords[locale as keyof typeof commonKeywords] || commonKeywords.en,
    });
}

export default function ToolsPage() {
    const t = useTranslations("Tools");
    const tNav = useTranslations("Navigation");

    const tools = [

        {
            title: t("visaCalculator"),
            description: t("visaDesc"),
            icon: Calendar,
            href: "/tools/visa-expiry",
            color: "text-green-500",
            bg: "bg-green-500/10",
        },
        {
            title: t("unitConverter"),
            description: t("unitDesc"),
            icon: Building2,
            href: "/tools/unit-converter",
            color: "text-orange-500",
            bg: "bg-orange-500/10",
        },
        {
            title: t("exchangeCalculator"),
            description: t("exchangeDesc"),
            icon: Coins,
            href: "/tools/exchange-calculator",
            color: "text-purple-500",
            bg: "bg-purple-500/10",
        },
    ];

    return (
        <div className="container py-10 px-4">
            <div className="mb-10 space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">{tNav("tools")}</h1>
                <p className="text-muted-foreground">
                    {t("essentialTools")}
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tools.map((tool) => (
                    <Link
                        key={tool.href}
                        href={tool.href}
                        className="group relative overflow-hidden rounded-xl border bg-background p-6 hover:shadow-lg transition-all hover:-translate-y-1"
                    >
                        <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${tool.bg} ${tool.color}`}>
                            <tool.icon className="h-6 w-6" />
                        </div>
                        <h3 className="mb-2 text-xl font-bold">{tool.title}</h3>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
