/**
 * Centralized Affiliate Links Management
 * 
 * DO NOT hardcode affiliate links in components.
 * All partner/affiliate URLs should be defined here for easy maintenance.
 * 
 * Usage: 
 * import { AFFILIATE_LINKS } from '@/constants/affiliates';
 * <ExternalLink href={AFFILIATE_LINKS.WISE_TRANSFER} />
 */

export const AFFILIATE_LINKS = {
    // Money Transfer Services
    WISE_TRANSFER: 'https://wise.com/invite/...',
    REMITLY: 'https://remitly.com/...',

    // Banking Services
    SHINHAN_BANK: 'https://www.shinhan.com/...',
    KAKAO_BANK: 'https://www.kakaobank.com/...',

    // Tax & Legal Services
    TAX_CONSULTANT: 'https://taxconsultant.example.com/...',
    IMMIGRATION_LAWYER: 'https://immigration-lawyer.example.com/...',

    // Real Estate
    ZIGBANG: 'https://www.zigbang.com/...',
    NAVER_REAL_ESTATE: 'https://land.naver.com/...',

    // Insurance
    HEALTH_INSURANCE: 'https://www.nhis.or.kr/...',

    // Telecom
    KT: 'https://www.kt.com/...',
    SKT: 'https://www.skt.com/...',

    // Job Platforms
    SARAMIN: 'https://www.saramin.co.kr/...',
    JOBKOREA: 'https://www.jobkorea.co.kr/...',
} as const;

export type AffiliateLinkKey = keyof typeof AFFILIATE_LINKS;
