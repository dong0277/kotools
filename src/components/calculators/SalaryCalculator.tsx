"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    INSURANCE_RATES,
    INCOME_TAX_BRACKETS,
    EARNED_INCOME_DEDUCTION,
    LOCAL_INCOME_TAX_RATE
} from "@/constants/rates";

export default function SalaryCalculator() {
    const t = useTranslations("Tools");
    const tCommon = useTranslations("Common");

    const [salary, setSalary] = useState<number>(3000000); // Default 3M KRW
    const [period, setPeriod] = useState<"monthly" | "annual">("monthly");
    const [nonTaxable, setNonTaxable] = useState<number>(200000); // Meal allowance usually
    const [dependents, setDependents] = useState<number>(1);

    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        // 1. Convert to Monthly Income for calculation base
        const monthlySalary = period === "annual" ? salary / 12 : salary;
        const annualSalary = period === "annual" ? salary : salary * 12;

        // Calculate taxable income (excluding non-taxable amount)
        // If period is annual, nonTaxable input is treated as annual amount, so divide by 12
        const monthlyNonTaxable = period === "annual" ? nonTaxable / 12 : nonTaxable;
        const taxableIncome = monthlySalary - monthlyNonTaxable;

        // 2. National Pension (4.5%, Max cap applies but simplified here)
        // Max monthly income for pension is 6,370,000 KRW (based on max contribution 286,650)
        // Base: taxable income (비과세 제외)
        const pensionBase = Math.min(Math.max(taxableIncome, 370000), 6370000);
        const nationalPension = Math.floor(pensionBase * INSURANCE_RATES.NATIONAL_PENSION.EMPLOYEE / 10) * 10;

        // 3. Health Insurance
        // Base: taxable income (비과세 제외)
        const healthInsurance = Math.floor(taxableIncome * INSURANCE_RATES.HEALTH_INSURANCE.EMPLOYEE / 10) * 10;

        // 4. Long-term Care Insurance
        const longTermCare = Math.floor(healthInsurance * INSURANCE_RATES.LONG_TERM_CARE.RATE / 10) * 10;

        // 5. Employment Insurance
        // Base: taxable income (비과세 제외)
        // Round the product first to avoid floating-point precision issues
        const employmentInsurance = Math.floor(Math.round(taxableIncome * INSURANCE_RATES.EMPLOYMENT_INSURANCE.EMPLOYEE) / 10) * 10;

        // Total Insurance
        const totalInsurance = nationalPension + healthInsurance + longTermCare + employmentInsurance;

        // 6. Income Tax (Simplified Monthly Withholding Tax)
        // Based on official Korean simplified tax table (근로소득 간이세액표) from NTS
        // Source: National Tax Service (국세청)

        const taxableMonthly = taxableIncome;
        let monthlyIncomeTax = 0;

        // Official simplified tax table (간이세액표)
        // Format: [max_salary, tax_for_1_dependent, tax_for_2_dependents, tax_for_3_dependents, tax_for_4_dependents, tax_for_5_dependents]
        // Values in Korean Won (원)
        const taxTable: [number, number, number, number, number, number][] = [
            [1_060_000, 0, 0, 0, 0, 0],
            [1_130_000, 2_020, 0, 0, 0, 0],
            [1_200_000, 2_990, 0, 0, 0, 0],
            [1_300_000, 4_740, 0, 0, 0, 0],
            [1_400_000, 6_800, 2_300, 0, 0, 0],
            [1_500_000, 8_920, 4_420, 0, 0, 0],
            [1_600_000, 10_980, 6_480, 0, 0, 0],
            [1_700_000, 13_050, 8_550, 0, 0, 0],
            [1_800_000, 15_110, 10_610, 2_630, 0, 0],
            [1_900_000, 17_180, 12_680, 4_610, 1_240, 0],
            [2_000_000, 19_200, 14_750, 6_600, 3_220, 0],
            [2_100_000, 22_740, 16_810, 8_580, 5_210, 1_830],
            [2_200_000, 26_590, 19_590, 10_960, 7_590, 4_210],
            [2_300_000, 29_160, 22_160, 12_550, 9_180, 5_800],
            [2_400_000, 32_050, 25_050, 14_530, 11_160, 7_780],
            [2_500_000, 35_600, 28_600, 16_530, 13_150, 9_780],
            [2_600_000, 39_690, 32_020, 18_650, 15_270, 11_900],
            [2_700_000, 48_250, 35_450, 21_890, 17_390, 14_020],
            [2_800_000, 56_800, 39_300, 25_180, 19_930, 16_130],
            [2_900_000, 65_360, 47_860, 28_480, 23_230, 18_250],
            [3_000_000, 74_350, 56_850, 31_940, 26_690, 21_440],
            [3_100_000, 82_900, 65_400, 35_240, 29_990, 24_740],
            [3_200_000, 91_460, 73_960, 38_540, 33_290, 28_040],
            [3_300_000, 102_770, 82_520, 46_720, 36_580, 31_330],
            [3_400_000, 114_990, 91_080, 54_640, 41_510, 34_500],
            [3_500_000, 127_220, 102_220, 62_460, 49_340, 37_630],
            [3_600_000, 137_000, 112_000, 68_720, 55_590, 42_470],
            [3_700_000, 151_670, 126_670, 78_110, 64_980, 51_860],
            [3_800_000, 169_260, 141_400, 87_680, 74_560, 61_430],
            [3_900_000, 182_610, 154_070, 97_370, 83_110, 69_990],
            [4_000_000, 195_390, 167_350, 109_500, 91_670, 78_550],
            [4_100_000, 209_310, 181_220, 121_820, 103_070, 87_100],
            [4_200_000, 222_660, 194_500, 134_040, 115_290, 96_540],
            [4_300_000, 236_010, 207_770, 146_270, 127_520, 108_770],
            [4_400_000, 249_360, 221_050, 158_490, 139_740, 120_990],
            [4_500_000, 262_840, 234_460, 170_850, 152_100, 133_350],
            [4_600_000, 279_370, 250_910, 186_250, 167_500, 148_750],
            [4_700_000, 293_390, 264_860, 199_150, 180_400, 161_650],
            [4_800_000, 307_420, 278_810, 212_050, 193_300, 174_550],
            [4_900_000, 321_440, 292_760, 224_950, 206_200, 187_450],
            [5_000_000, 335_470, 306_710, 237_850, 219_100, 200_350],
            [5_100_000, 349_490, 320_660, 250_750, 232_000, 213_250],
            [5_200_000, 363_520, 334_610, 263_650, 244_900, 226_150],
            [5_300_000, 380_050, 351_160, 279_050, 257_800, 241_550],
            [5_400_000, 394_070, 365_110, 291_950, 273_200, 254_450],
            [5_500_000, 408_100, 379_060, 304_850, 286_100, 267_350],
            [6_000_000, 463_190, 434_150, 359_940, 341_190, 322_440],
            [7_000_000, 573_370, 544_330, 470_120, 451_370, 432_620],
            [8_000_000, 683_550, 654_510, 580_300, 561_550, 542_800],
            [9_000_000, 793_730, 764_690, 690_480, 671_730, 652_980],
            [10_000_000, 1507400, 1431570, 1200840, 1170840, 1140840],
        ];

        // High Income Base Data (Tax amounts for exactly 10,000,000 KRW salary)
        // From kotools/kr-tax-calculator-2023/data/taxTable.ts
        const taxBase10Million = [
            0, // placeholder
            1507400, 1431570, 1200840, 1170840, 1140840, // 1~5 dependents
            1110840, 1080840, 1050840, 1020840, 990840, 960840 // 6~11 dependents
        ];

        // Find the appropriate tax bracket with interpolation
        let foundTax = false;
        let prevMax = 0;
        let prevTax = 0;

        // Helper to get tax from row based on dependents
        const getTaxFromRow = (row: number[]) => {
            if (dependents === 1) return row[1];
            if (dependents === 2) return row[2];
            if (dependents === 3) return row[3];
            if (dependents === 4) return row[4];
            return row[5]; // 5 or more
        };

        if (taxableMonthly <= 10_000_000) {
            for (const row of taxTable) {
                const maxSalary = row[0];
                const currentTax = getTaxFromRow(row);

                if (taxableMonthly <= maxSalary) {
                    // Interpolate
                    if (maxSalary === prevMax) {
                        monthlyIncomeTax = currentTax;
                    } else {
                        const ratio = (taxableMonthly - prevMax) / (maxSalary - prevMax);
                        monthlyIncomeTax = prevTax + (currentTax - prevTax) * ratio;
                    }
                    foundTax = true;
                    break;
                }

                prevMax = maxSalary;
                prevTax = currentTax;
            }
        } else {
            // For salaries above 10M, use progressive calculation based on taxService.ts
            const excessAmount = taxableMonthly;
            let baseTax10M = 0;

            // Calculate base tax for 10M
            if (dependents <= 11) {
                baseTax10M = taxBase10Million[dependents];
            } else {
                const tax10 = taxBase10Million[10];
                const tax11 = taxBase10Million[11];
                const diff = tax10 - tax11;
                const extraPeople = dependents - 11;
                baseTax10M = tax11 - (diff * extraPeople);
            }

            let finalTax = 0;

            if (excessAmount <= 14000000) {
                const excess = excessAmount - 10000000;
                finalTax = baseTax10M + (excess * 0.98 * 0.35) + 25000;
            } else if (excessAmount <= 28000000) {
                const excess = excessAmount - 14000000;
                finalTax = baseTax10M + 1397000 + (excess * 0.98 * 0.38);
            } else if (excessAmount <= 30000000) {
                const excess = excessAmount - 28000000;
                finalTax = baseTax10M + 6610600 + (excess * 0.98 * 0.40);
            } else if (excessAmount <= 45000000) {
                const excess = excessAmount - 30000000;
                finalTax = baseTax10M + 7394600 + (excess * 0.40);
            } else if (excessAmount <= 87000000) {
                const excess = excessAmount - 45000000;
                finalTax = baseTax10M + 13394600 + (excess * 0.42);
            } else {
                const excess = excessAmount - 87000000;
                finalTax = baseTax10M + 31034600 + (excess * 0.45);
            }

            monthlyIncomeTax = finalTax;
            foundTax = true;
        }

        // Round to nearest 10 won
        monthlyIncomeTax = Math.floor(monthlyIncomeTax / 10) * 10;
        const monthlyLocalTax = Math.floor(monthlyIncomeTax * LOCAL_INCOME_TAX_RATE / 10) * 10;

        const totalTax = monthlyIncomeTax + monthlyLocalTax;

        // Final Net Pay
        // Floor to nearest 1 won (remove decimals)
        const netPay = Math.floor(monthlySalary - totalInsurance - totalTax);

        setResult({
            period,
            annualSalary,
            monthlySalary,
            nationalPension,
            healthInsurance,
            longTermCare,
            employmentInsurance,
            monthlyIncomeTax,
            monthlyLocalTax,
            totalInsurance,
            totalTax,
            netPay
        });
    };

    const formatMoney = (amount: number) => {
        return new Intl.NumberFormat('ko-KR').format(amount) + '원';
    };

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('ko-KR').format(num);
    };

    const parseNumber = (str: string) => {
        return Number(str.replace(/,/g, ''));
    };


    return (
        <div className="grid gap-8 md:grid-cols-2">
            <Card>
                <CardContent className="space-y-6 pt-6">
                    <div className="space-y-2">
                        <Label>{t("salaryType")}</Label>
                        <Tabs value={period} onValueChange={(v) => setPeriod(v as any)} className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="monthly" data-testid="tab-monthly">{t("monthly")}</TabsTrigger>
                                <TabsTrigger value="annual" data-testid="tab-annual">{t("annual")}</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="salary">{t("salaryAmount")}</Label>
                        <Input
                            id="salary"
                            type="text"
                            value={formatNumber(salary)}
                            onChange={(e) => setSalary(parseNumber(e.target.value) || 0)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="nonTaxable">{t("nonTaxableIncome")}</Label>
                        <Input
                            id="nonTaxable"
                            type="text"
                            value={formatNumber(nonTaxable)}
                            onChange={(e) => setNonTaxable(parseNumber(e.target.value) || 0)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="dependents">{t("dependents")}</Label>
                        <Input
                            id="dependents"
                            type="number"
                            value={dependents}
                            onChange={(e) => setDependents(Number(e.target.value))}
                        />
                    </div>

                    <Button onClick={calculate} className="w-full" size="lg">
                        {tCommon("calculate")}
                    </Button>
                </CardContent>
            </Card>

            {result && (
                <Card className="border-2 shadow-lg">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-xl">{tCommon("result")}</CardTitle>
                        <CardDescription>{t("estimatedNetPay")}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* All Deductions in Single List */}
                        <div className="space-y-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-600 dark:text-slate-400">{t("nationalPensionLabel")}</span>
                                <span className="font-medium text-slate-900 dark:text-slate-100">{formatMoney(result.nationalPension)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-600 dark:text-slate-400">{t("healthInsuranceLabel")}</span>
                                <span className="font-medium text-slate-900 dark:text-slate-100">{formatMoney(result.healthInsurance)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-600 dark:text-slate-400">{t("longTermCareLabel")}</span>
                                <span className="font-medium text-slate-900 dark:text-slate-100">{formatMoney(result.longTermCare)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-600 dark:text-slate-400">{t("employmentInsLabel")}</span>
                                <span className="font-medium text-slate-900 dark:text-slate-100">{formatMoney(result.employmentInsurance)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-600 dark:text-slate-400">{t("incomeTaxLabel")}</span>
                                <span className="font-medium text-slate-900 dark:text-slate-100">{formatMoney(result.monthlyIncomeTax)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-600 dark:text-slate-400">{t("localTaxLabel")}</span>
                                <span className="font-medium text-slate-900 dark:text-slate-100">{formatMoney(result.monthlyLocalTax)}</span>
                            </div>

                            {/* Net Pay - Highlighted */}
                            <div className="border-t-2 border-slate-300 dark:border-slate-600 pt-3 mt-3">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-red-600 dark:text-red-400">
                                        {result.period === "annual" ? "월 예상 실수령액" : t("netPay")}
                                    </span>
                                    <span className="text-lg font-bold text-red-600 dark:text-red-400">{formatMoney(result.netPay)}</span>
                                </div>
                            </div>

                            {/* Annual Total for Annual Mode */}
                            {result.period === "annual" && (
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-red-600 dark:text-red-400">연 예상 실수령액</span>
                                    <span className="text-lg font-bold text-red-600 dark:text-red-400">{formatMoney(result.netPay * 12)}</span>
                                </div>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="bg-slate-50 dark:bg-slate-900 border-t">
                        <p className="text-xs text-slate-500 dark:text-slate-400 text-center w-full">
                            {t("estimationDisclaimer")}
                        </p>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
}
