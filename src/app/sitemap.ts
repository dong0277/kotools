import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://kotools.vercel.app';
    const locales = ['en', 'ko'];

    // Static pages
    const staticPages = [
        '',
        '/tools',
        '/tools/salary-calculator',
        '/tools/visa-expiry',
        '/tools/unit-converter',
        '/tools/exchange-calculator',
        '/guides',
        '/privacy',
        '/terms',
    ];

    // Generate sitemap entries for all locales
    const sitemapEntries: MetadataRoute.Sitemap = [];

    locales.forEach((locale) => {
        staticPages.forEach((page) => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${page}`,
                lastModified: new Date(),
                changeFrequency: page === '' || page === '/tools' ? 'daily' : 'weekly',
                priority: page === '' ? 1.0 : page.includes('/tools/') ? 0.8 : 0.6,
                alternates: {
                    languages: {
                        en: `${baseUrl}/en${page}`,
                        ko: `${baseUrl}/ko${page}`,
                    },
                },
            });
        });
    });

    return sitemapEntries;
}
