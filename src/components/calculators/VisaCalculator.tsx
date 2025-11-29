"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { addDays, format, differenceInDays, isValid } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function VisaCalculator() {
    const t = useTranslations("Tools");
    const tCommon = useTranslations("Common");
    const locale = useLocale();
    const dateLocale = locale === "ko" ? ko : undefined;

    const [entryDate, setEntryDate] = useState<Date | undefined>(new Date());
    const [duration, setDuration] = useState<string>("90");
    const [customDuration, setCustomDuration] = useState<string>("");
    const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined);
    const [daysRemaining, setDaysRemaining] = useState<number | null>(null);

    const calculateExpiry = () => {
        if (!entryDate) return;

        const daysToAdd = customDuration ? parseInt(customDuration) : parseInt(duration);

        if (isNaN(daysToAdd)) return;

        const expiry = addDays(entryDate, daysToAdd);
        setExpiryDate(expiry);

        const today = new Date();
        // Reset time part for accurate day calculation
        today.setHours(0, 0, 0, 0);
        const expiryReset = new Date(expiry);
        expiryReset.setHours(0, 0, 0, 0);

        const remaining = differenceInDays(expiryReset, today);
        setDaysRemaining(remaining);
    };

    return (
        <div className="grid gap-8 md:grid-cols-2">
            <Card>
                <CardContent className="space-y-6 pt-6">
                    <div className="space-y-2">
                        <Label>{t("entryDate")}</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !entryDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {entryDate ? format(entryDate, "PPP", { locale: dateLocale }) : <span>{t("pickDate")}</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={entryDate}
                                    onSelect={setEntryDate}
                                    initialFocus
                                    locale={dateLocale}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="space-y-2">
                        <Label>{t("durationOfStay")}</Label>
                        <Select value={duration} onValueChange={setDuration}>
                            <SelectTrigger>
                                <SelectValue placeholder={t("selectDuration")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="30">{t("30days")}</SelectItem>
                                <SelectItem value="60">{t("60days")}</SelectItem>
                                <SelectItem value="90">{t("90days")}</SelectItem>
                                <SelectItem value="180">{t("180days")}</SelectItem>
                                <SelectItem value="365">{t("1year")}</SelectItem>
                                <SelectItem value="custom">{t("custom")}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {duration === "custom" && (
                        <div className="space-y-2">
                            <Label>{t("customDays")}</Label>
                            <Input
                                type="number"
                                value={customDuration}
                                onChange={(e) => setCustomDuration(e.target.value)}
                                placeholder={t("enterDays")}
                            />
                        </div>
                    )}

                    <Button onClick={calculateExpiry} className="w-full" size="lg">
                        {tCommon("calculate")}
                    </Button>
                </CardContent>
            </Card>

            {expiryDate && daysRemaining !== null && (
                <Card className="bg-slate-50 dark:bg-slate-900 border-primary/20">
                    <CardHeader>
                        <CardTitle>{tCommon("result")}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8 text-center">
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">{t("visaExpiryDate")}</p>
                            <p className="text-3xl font-bold text-primary">
                                {format(expiryDate, "PPP", { locale: dateLocale })}
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border">
                            <p className="text-sm text-muted-foreground mb-2">{t("daysRemaining")}</p>
                            <div className={cn(
                                "text-5xl font-extrabold",
                                daysRemaining < 0 ? "text-red-500" :
                                    daysRemaining < 30 ? "text-orange-500" : "text-green-500"
                            )}>
                                {daysRemaining < 0 ? `D+${Math.abs(daysRemaining)}` : `D-${daysRemaining}`}
                            </div>
                            <p className="mt-2 text-sm font-medium">
                                {daysRemaining < 0
                                    ? t("visaExpired")
                                    : daysRemaining === 0
                                        ? t("expiresToday")
                                        : t("renewReminder")}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
