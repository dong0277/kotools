"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft, RefreshCw } from "lucide-react";
import { EXCHANGE_RATE_API, AMOUNT_PRESETS } from "@/constants/rates";

export default function ExchangeCalculator() {
    const t = useTranslations("Tools");
    const tCommon = useTranslations("Common");

    const [amount, setAmount] = useState<number>(1);
    const [inputValue, setInputValue] = useState<string>("1");
    const [fromCurrency, setFromCurrency] = useState<string>("USD");
    const [toCurrency, setToCurrency] = useState<string>("KRW");
    const [rates, setRates] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [lastUpdated, setLastUpdated] = useState<string>("");

    useEffect(() => {
        fetchRates();
    }, []);

    const fetchRates = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${EXCHANGE_RATE_API.BASE_URL}${EXCHANGE_RATE_API.DEFAULT_BASE}`);
            const data = await response.json();
            setRates(data.rates);
            setLastUpdated(new Date(data.time_last_updated * 1000).toLocaleString());
        } catch (error) {
            console.error("Failed to fetch rates", error);
        } finally {
            setLoading(false);
        }
    };

    const convert = (val: number, from: string, to: string) => {
        if (!rates[from] || !rates[to]) return 0;
        const inBase = val / rates[from];
        return inBase * rates[to];
    };

    const result = convert(amount, fromCurrency, toCurrency);

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/,/g, '');
        if (rawValue === '') {
            setInputValue('');
            setAmount(0);
            return;
        }
        if (isNaN(Number(rawValue))) return;

        const parts = rawValue.split('.');
        const integerPart = parts[0];
        const decimalPart = parts.length > 1 ? '.' + parts[1] : '';

        const formattedInteger = integerPart === '' ? '' : Number(integerPart).toLocaleString();
        const newValue = formattedInteger + decimalPart;

        setInputValue(newValue);
        setAmount(Number(rawValue));
    };

    const updateAmount = (newVal: number) => {
        setAmount(newVal);
        setInputValue(newVal.toLocaleString());
    };

    const addAmount = (val: number) => {
        updateAmount(amount + val);
    };

    return (
        <Card className="max-w-xl mx-auto">

            <CardContent className="space-y-8">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{t("base")}: KRW</span>
                    <div className="flex items-center gap-2">
                        <span>{t("updated")}: {lastUpdated}</span>
                        <Button variant="ghost" size="icon" onClick={fetchRates} disabled={loading}>
                            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6">
                    <div className="space-y-2">
                        <Label>{t("amount")}</Label>
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                                className="text-lg h-12 text-right"
                            />
                            <Select value={fromCurrency} onValueChange={setFromCurrency}>
                                <SelectTrigger className="w-[120px] h-12 text-lg">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(rates).map(currency => (
                                        <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Quick Add Buttons */}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {fromCurrency === 'KRW' ? (
                                AMOUNT_PRESETS.KRW.map(val => (
                                    <Button key={val} variant="outline" size="sm" onClick={() => addAmount(val)}>
                                        +{val.toLocaleString()}
                                    </Button>
                                ))
                            ) : (
                                AMOUNT_PRESETS.USD.map(val => (
                                    <Button key={val} variant="outline" size="sm" onClick={() => addAmount(val)}>
                                        +{val.toLocaleString()}
                                    </Button>
                                ))
                            )}
                            <Button variant="ghost" size="sm" onClick={() => updateAmount(0)} className="text-red-500">
                                {t("clear")}
                            </Button>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Button variant="ghost" size="icon" onClick={swapCurrencies} className="rounded-full">
                            <ArrowRightLeft className="h-6 w-6" />
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <Label>{t("convertedAmount")}</Label>
                        <div className="flex gap-2">
                            <Input
                                readOnly
                                value={result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                className="text-lg h-12 text-right font-bold bg-muted"
                            />
                            <Select value={toCurrency} onValueChange={setToCurrency}>
                                <SelectTrigger className="w-[120px] h-12 text-lg">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(rates).map(currency => (
                                        <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
