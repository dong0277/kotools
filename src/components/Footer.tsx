"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Footer() {
    const t = useTranslations("Common");
    const tNav = useTranslations("Navigation");
    const tTools = useTranslations("Tools");

    return (
        <footer className="border-t bg-muted/40">
            <div className="container py-10 md:py-16 px-4">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">K-Life Tools</h3>
                        <p className="text-sm text-muted-foreground">
                            {t("disclaimer")}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">{tNav("tools")}</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">

                            <li>
                                <Link href="/tools/exchange-calculator" className="hover:text-foreground">
                                    {tTools("exchangeCalculator")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/visa-expiry" className="hover:text-foreground">
                                    {tTools("visaCalculator")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools/unit-converter" className="hover:text-foreground">
                                    {tTools("unitConverter")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">{tNav("guides")}</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/guides" className="hover:text-foreground">
                                    {t("allGuides")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">{t("legal")}</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/privacy" className="hover:text-foreground">
                                    {t("privacyPolicy")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-foreground">
                                    {t("termsOfService")}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} K-Life Tools. {t("allRightsReserved")}</p>
                    <p className="mt-2 text-xs">{t("affiliateDisclosure")}</p>
                </div>
            </div>
        </footer>
    );
}
