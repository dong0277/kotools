'use client';

import Script from 'next/script';

interface WebsiteSchemaProps {
    locale: string;
}

export function WebsiteSchema({ locale }: WebsiteSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'K-Life Tools',
        alternateName: locale === 'ko' ? '한국 생활 도구' : 'Korea Life Tools',
        url: `https://kotools.vercel.app/${locale}`,
        description:
            locale === 'ko'
                ? '한국 거주 외국인을 위한 필수 계산기 및 가이드'
                : 'Essential calculators and guides for expats in Korea',
        inLanguage: locale === 'ko' ? 'ko-KR' : 'en-US',
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `https://kotools.vercel.app/${locale}/tools?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    };

    return (
        <Script
            id="website-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface OrganizationSchemaProps {
    locale: string;
}

export function OrganizationSchema({ locale }: OrganizationSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'K-Life Tools',
        url: 'https://kotools.vercel.app',
        logo: 'https://kotools.vercel.app/logo.png',
        description:
            locale === 'ko'
                ? '한국 거주 외국인을 위한 필수 도구와 가이드를 제공합니다'
                : 'Providing essential tools and guides for expats living in Korea',
        sameAs: [
            // Add social media links when available
            // 'https://twitter.com/klifetools',
            // 'https://facebook.com/klifetools',
        ],
    };

    return (
        <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface BreadcrumbSchemaProps {
    items: Array<{
        name: string;
        url: string;
    }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <Script
            id="breadcrumb-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface ArticleSchemaProps {
    title: string;
    description: string;
    datePublished: string;
    dateModified?: string;
    author?: string;
    image?: string;
    url: string;
}

export function ArticleSchema({
    title,
    description,
    datePublished,
    dateModified,
    author = 'K-Life Tools',
    image = 'https://kotools.vercel.app/og-image.png',
    url,
}: ArticleSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        image,
        datePublished,
        dateModified: dateModified || datePublished,
        author: {
            '@type': 'Organization',
            name: author,
        },
        publisher: {
            '@type': 'Organization',
            name: 'K-Life Tools',
            logo: {
                '@type': 'ImageObject',
                url: 'https://kotools.vercel.app/logo.png',
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
        },
    };

    return (
        <Script
            id="article-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface SoftwareApplicationSchemaProps {
    name: string;
    description: string;
    url: string;
    locale: string;
}

export function SoftwareApplicationSchema({
    name,
    description,
    url,
    locale,
}: SoftwareApplicationSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name,
        description,
        url,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web Browser',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        inLanguage: locale === 'ko' ? 'ko-KR' : 'en-US',
    };

    return (
        <Script
            id="software-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
