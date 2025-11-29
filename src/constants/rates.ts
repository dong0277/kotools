/**
 * Tax Rates and Insurance Premiums Configuration
 * 
 * All calculation constants should be defined here for easy updates
 * when government policies change.
 * 
 * Last Updated: 2025
 * Source: National Tax Service, National Health Insurance Service
 */

// 4대 보험 요율 (4 Major Insurances)
export const INSURANCE_RATES = {
    // 국민연금 (National Pension)
    NATIONAL_PENSION: {
        EMPLOYEE: 0.045, // 4.5%
        EMPLOYER: 0.045, // 4.5%
        TOTAL: 0.09, // 9%
    },

    // 건강보험 (Health Insurance)
    HEALTH_INSURANCE: {
        EMPLOYEE: 0.03545, // 3.545%
        EMPLOYER: 0.03545, // 3.545%
        TOTAL: 0.0709, // 7.09%
    },

    // 장기요양보험 (Long-term Care Insurance)
    LONG_TERM_CARE: {
        // 건강보험료의 12.95%
        RATE: 0.1295,
        // 실제 공제율 = 건강보험료 × 0.1295
    },

    // 고용보험 (Employment Insurance)
    EMPLOYMENT_INSURANCE: {
        EMPLOYEE: 0.009, // 0.9%
        EMPLOYER: 0.009, // 0.9%
        TOTAL: 0.018, // 1.8%
    },

    // 산재보험 (Industrial Accident Insurance)
    // 근로자 부담 없음 (fully paid by employer)
    INDUSTRIAL_ACCIDENT: {
        EMPLOYEE: 0,
        EMPLOYER: 0.007, // 0.7% (업종별 상이)
    },
} as const;

// 소득세율 (Income Tax Brackets) - 2025
export const INCOME_TAX_BRACKETS = [
    { max: 14_000_000, rate: 0.06, deduction: 0 },
    { max: 50_000_000, rate: 0.15, deduction: 1_260_000 },
    { max: 88_000_000, rate: 0.24, deduction: 5_760_000 },
    { max: 150_000_000, rate: 0.35, deduction: 15_440_000 },
    { max: 300_000_000, rate: 0.38, deduction: 19_940_000 },
    { max: 500_000_000, rate: 0.40, deduction: 25_940_000 },
    { max: 1_000_000_000, rate: 0.42, deduction: 35_940_000 },
    { max: Infinity, rate: 0.45, deduction: 65_940_000 },
] as const;

// 지방소득세 (Local Income Tax)
export const LOCAL_INCOME_TAX_RATE = 0.1; // 소득세의 10%

// 근로소득공제 (Earned Income Deduction)
export const EARNED_INCOME_DEDUCTION = (annualIncome: number): number => {
    if (annualIncome <= 5_000_000) {
        return annualIncome * 0.7;
    } else if (annualIncome <= 15_000_000) {
        return 3_500_000 + (annualIncome - 5_000_000) * 0.4;
    } else if (annualIncome <= 45_000_000) {
        return 7_500_000 + (annualIncome - 15_000_000) * 0.15;
    } else if (annualIncome <= 100_000_000) {
        return 12_000_000 + (annualIncome - 45_000_000) * 0.05;
    } else {
        return 14_750_000 + (annualIncome - 100_000_000) * 0.02;
    }
};

// 기본공제 (Standard Deduction)
export const STANDARD_DEDUCTION = 1_500_000; // 본인 기본공제

// 부양가족 공제 (Dependent Deduction)
export const DEPENDENT_DEDUCTION = 1_500_000; // per dependent

// 평-제곱미터 변환 상수 (Pyeong to Square Meter Conversion)
export const AREA_CONVERSION = {
    PYEONG_TO_SQM: 3.3058,
    SQM_TO_PYEONG: 1 / 3.3058,
    SQM_TO_SQFT: 10.7639,
    SQFT_TO_SQM: 1 / 10.7639,
} as const;

// 환율 API 설정 (Exchange Rate API Configuration)
export const EXCHANGE_RATE_API = {
    // Free tier: https://www.exchangerate-api.com
    BASE_URL: 'https://api.exchangerate-api.com/v4/latest/',
    DEFAULT_BASE: 'KRW', // Korean Won as base
    SUPPORTED_CURRENCIES: ['USD', 'EUR', 'JPY', 'CNY', 'GBP', 'AUD', 'CAD'] as const,
} as const;

// 자주 사용되는 금액 단위 (Common Amount Presets)
export const AMOUNT_PRESETS = {
    KRW: [10_000, 50_000, 100_000, 500_000, 1_000_000], // 만원 단위
    USD: [100, 500, 1000, 5000, 10000],
} as const;
