"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export default function Header() {
    const t = useTranslations("Navigation");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLocale = () => {
        const nextLocale = locale === "en" ? "ko" : "en";
        router.push(pathname, { locale: nextLocale });
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold tracking-tight text-primary">
                            K-Life Tools
                        </span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <Link
                            href="/"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            {t("home")}
                        </Link>
                        <Link
                            href="/tools"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            {t("tools")}
                        </Link>
                        <Link
                            href="/guides"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            {t("guides")}
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        onClick={toggleLocale}
                        aria-label="Toggle Language"
                    >
                        <Globe className="h-5 w-5" />
                        <span className="sr-only">Toggle Language</span>
                        <span className="ml-2 text-xs font-bold uppercase">{locale}</span>
                    </Button>
                </div>
            </div>
        </header>
    );
}
