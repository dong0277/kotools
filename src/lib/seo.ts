import { Metadata } from 'next';

export interface SEOConfig {
    title: string;
    description: string;
    path: string;
    locale: string;
    keywords?: string[];
    image?: string;
}

export function generateSEOMetadata({
    title,
    description,
    path,
    locale,
    keywords = [],
    image = '/og-image.svg',
}: SEOConfig): Metadata {
    const baseUrl = 'https://kotools.vercel.app';
    const url = `${baseUrl}/${locale}${path}`;
    const alternateLocale = locale === 'en' ? 'ko' : 'en';

    return {
        title,
        description,
        keywords: keywords.join(', '),
        authors: [{ name: 'K-Life Tools' }],
        creator: 'K-Life Tools',
        publisher: 'K-Life Tools',
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: url,
            languages: {
                en: `${baseUrl}/en${path}`,
                ko: `${baseUrl}/ko${path}`,
            },
        },
        openGraph: {
            title,
            description,
            url,
            siteName: 'K-Life Tools',
            locale: locale === 'ko' ? 'ko_KR' : 'en_US',
            alternateLocale: alternateLocale === 'ko' ? 'ko_KR' : 'en_US',
            type: 'website',
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
            creator: '@klifetools',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        verification: {
            google: 'your-google-verification-code',
            // yandex: 'your-yandex-verification-code',
            // bing: 'your-bing-verification-code',
        },
    };
}

// Common keywords for all pages
export const commonKeywords = {
    en: [
        'Korea',
        'expat',
        'calculator',
        'tools',
        'South Korea',
        'living in Korea',
        'Korean life',
        'foreigner',
        'visa',
        'salary',
        'exchange rate',
    ],
    ko: [
        '한국',
        '외국인',
        '계산기',
        '도구',
        '대한민국',
        '한국 생활',
        '비자',
        '급여',
        '환율',
        '유학생',
        '주재원',
    ],
};
