"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft } from "lucide-react";
import { AREA_CONVERSION } from "@/constants/rates";

export default function UnitConverter() {
    const t = useTranslations("Tools");
    const tCommon = useTranslations("Common");

    const [pyeong, setPyeong] = useState<string>("");
    const [sqm, setSqm] = useState<string>("");
    const [sqft, setSqft] = useState<string>("");

    const formatNumber = (num: number | string) => {
        if (num === "") return "";
        const parts = num.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    };

    const parseNumber = (str: string) => {
        return parseFloat(str.replace(/,/g, ''));
    };

    const handlePyeongChange = (value: string) => {
        // Allow only numbers, commas, and one decimal point
        if (!/^[\d,]*\.?[\d]*$/.test(value)) return;

        const rawValue = value.replace(/,/g, '');
        if (rawValue === "") {
            setPyeong("");
            setSqm("");
            setSqft("");
            return;
        }

        // Format the input value immediately for the current field
        const formattedValue = formatNumber(rawValue);
        setPyeong(formattedValue);

        const p = parseFloat(rawValue);
        if (!isNaN(p)) {
            const s = p * AREA_CONVERSION.PYEONG_TO_SQM;
            setSqm(formatNumber(s.toFixed(2)));
            setSqft(formatNumber((s * AREA_CONVERSION.SQM_TO_SQFT).toFixed(2)));
        }
    };

    const handleSqmChange = (value: string) => {
        if (!/^[\d,]*\.?[\d]*$/.test(value)) return;

        const rawValue = value.replace(/,/g, '');
        if (rawValue === "") {
            setSqm("");
            setPyeong("");
            setSqft("");
            return;
        }

        const formattedValue = formatNumber(rawValue);
        setSqm(formattedValue);

        const s = parseFloat(rawValue);
        if (!isNaN(s)) {
            setPyeong(formatNumber((s * AREA_CONVERSION.SQM_TO_PYEONG).toFixed(2)));
            setSqft(formatNumber((s * AREA_CONVERSION.SQM_TO_SQFT).toFixed(2)));
        }
    };

    const handleSqftChange = (value: string) => {
        if (!/^[\d,]*\.?[\d]*$/.test(value)) return;

        const rawValue = value.replace(/,/g, '');
        if (rawValue === "") {
            setSqft("");
            setPyeong("");
            setSqm("");
            return;
        }

        const formattedValue = formatNumber(rawValue);
        setSqft(formattedValue);

        const f = parseFloat(rawValue);
        if (!isNaN(f)) {
            const s = f * AREA_CONVERSION.SQFT_TO_SQM;
            setSqm(formatNumber(s.toFixed(2)));
            setPyeong(formatNumber((s * AREA_CONVERSION.SQM_TO_PYEONG).toFixed(2)));
        }
    };

    const reset = () => {
        setPyeong("");
        setSqm("");
        setSqft("");
    };

    return (
        <Card className="max-w-xl mx-auto">
            <CardContent className="space-y-8 pt-6">
                <div className="grid gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="pyeong" className="text-lg">{t("pyeongLabel")}</Label>
                        <div className="relative">
                            <Input
                                id="pyeong"
                                type="text"
                                value={pyeong}
                                onChange={(e) => handlePyeongChange(e.target.value)}
                                className="text-lg h-12"
                                placeholder="0"
                            />
                            <div className="absolute right-3 top-3 text-muted-foreground">py</div>
                        </div>
                    </div>

                    <div className="flex justify-center text-muted-foreground">
                        <ArrowRightLeft className="h-6 w-6 rotate-90" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="sqm" className="text-lg">{t("sqmLabel")}</Label>
                        <div className="relative">
                            <Input
                                id="sqm"
                                type="text"
                                value={sqm}
                                onChange={(e) => handleSqmChange(e.target.value)}
                                className="text-lg h-12"
                                placeholder="0"
                            />
                            <div className="absolute right-3 top-3 text-muted-foreground">m²</div>
                        </div>
                    </div>

                    <div className="flex justify-center text-muted-foreground">
                        <ArrowRightLeft className="h-6 w-6 rotate-90" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="sqft" className="text-lg">{t("sqftLabel")}</Label>
                        <div className="relative">
                            <Input
                                id="sqft"
                                type="text"
                                value={sqft}
                                onChange={(e) => handleSqftChange(e.target.value)}
                                className="text-lg h-12"
                                placeholder="0"
                            />
                            <div className="absolute right-3 top-3 text-muted-foreground">ft²</div>
                        </div>
                    </div>
                </div>

                <Button variant="outline" onClick={reset} className="w-full">
                    {tCommon("reset")}
                </Button>
            </CardContent>
        </Card>
    );
}
