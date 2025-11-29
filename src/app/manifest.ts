import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'K-Life Tools - Korea Expat Calculator Hub',
        short_name: 'K-Life Tools',
        description: 'Essential calculators and guides for expats in Korea. Salary, Visa, Exchange Rate, and more.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#3b82f6',
        orientation: 'portrait-primary',
        icons: [
            {
                src: '/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable',
            },
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
        categories: ['finance', 'utilities', 'productivity'],
        lang: 'en',
        dir: 'ltr',
    };
}
