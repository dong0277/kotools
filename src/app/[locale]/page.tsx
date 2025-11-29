import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, FileText, Coins, Calendar, Building2 } from "lucide-react";

export default function HomePage() {
    const t = useTranslations("Home");
    const tTools = useTranslations("Tools");

    const tools = [

        {
            title: tTools("visaCalculator"),
            description: tTools("visaDesc"),
            icon: Calendar,
            href: "/tools/visa-expiry",
            color: "text-green-500",
            bg: "bg-green-500/10",
        },
        {
            title: tTools("unitConverter"),
            description: tTools("unitDesc"),
            icon: Building2,
            href: "/tools/unit-converter",
            color: "text-orange-500",
            bg: "bg-orange-500/10",
        },
        {
            title: tTools("exchangeCalculator"),
            description: tTools("exchangeDesc"),
            icon: Coins,
            href: "/tools/exchange-calculator",
            color: "text-purple-500",
            bg: "bg-purple-500/10",
        },
    ];

    return (
        <div className="flex flex-col gap-16 pb-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-muted/40 py-20 md:py-32">
                <div className="container relative z-10 flex flex-col items-center text-center px-4">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                        {t("heroTitle")}
                    </h1>
                    <p className="mt-6 max-w-[42rem] text-lg text-muted-foreground sm:text-xl">
                        {t("heroSubtitle")}
                    </p>
                    <div className="mt-10 flex gap-4">
                        <Button size="lg" asChild>
                            <Link href="/tools">
                                {t("exploreTools")} <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/guides">{t("readGuides")}</Link>
                        </Button>
                    </div>
                </div>

                {/* Background decoration */}
                <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
            </section>

            {/* Tools Grid */}
            <section className="container px-4">
                <div className="mb-10 flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">{t("popularTools")}</h2>
                    <Link href="/tools" className="text-sm font-medium text-muted-foreground hover:text-primary">
                        {t("viewAllTools")}
                    </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
            </section>

            {/* Guides Section Placeholder */}
            <section className="container px-4">
                <div className="mb-10 flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">{t("latestGuides")}</h2>
                    <Link href="/guides" className="text-sm font-medium text-muted-foreground hover:text-primary">
                        {t("viewAllGuides")}
                    </Link>
                </div>

                <div className="rounded-xl border border-dashed p-12 text-center">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <h3 className="mt-4 text-lg font-semibold">{t("comingSoon")}</h3>
                    <p className="text-muted-foreground">{t("workingOnGuides")}</p>
                </div>
            </section>
        </div>
    );
}
