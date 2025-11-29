import fs from "fs";
import path from "path";
import matter from "gray-matter";

const guidesDirectory = path.join(process.cwd(), "content/guides");

export type Guide = {
    slug: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
    content: string;
    locale: string;
};

export function getAllGuides(locale: string = "en"): Guide[] {
    const localeDirectory = path.join(guidesDirectory, locale);

    if (!fs.existsSync(localeDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(localeDirectory);
    const allGuides = fileNames
        .filter((fileName) => fileName.endsWith(".mdx"))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx$/, "");
            const fullPath = path.join(localeDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data, content } = matter(fileContents);

            return {
                slug,
                title: data.title,
                date: data.date,
                description: data.description,
                tags: data.tags || [],
                locale,
                content,
            };
        })
        .sort((a, b) => (a.date < b.date ? 1 : -1));

    return allGuides;
}

export function getGuideBySlug(slug: string, locale: string = "en"): Guide | null {
    // Try to find exact match first
    // We assume file naming convention: `slug.mdx` and frontmatter contains locale
    // But strictly, if we want `how-to-tax` to work for both en and ko, we might need different files.
    // Let's assume we have `how-to-tax.en.mdx` and `how-to-tax.ko.mdx`?
    // Or just `how-to-tax-en.mdx`?
    // The prompt says: "MDX 블로그 엔진".
    // Let's stick to simple: `slug` is unique per locale?
    // Or `slug` is shared, but content differs.

    // Let's try to find a file that matches the slug and has the correct locale in frontmatter.
    // This is inefficient if we have many files.
    // Better: `slug` in URL maps to a file.
    // If we want localized content, maybe `content/guides/en/slug.mdx` and `content/guides/ko/slug.mdx`?
    // Let's change structure to `content/guides/[locale]/[slug].mdx`.

    const localeDirectory = path.join(guidesDirectory, locale);
    const fullPath = path.join(localeDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
        tags: data.tags || [],
        locale,
        content,
    };
}

export function getAllGuideSlugs(locale: string = "en") {
    const localeDirectory = path.join(guidesDirectory, locale);
    if (!fs.existsSync(localeDirectory)) return [];

    const fileNames = fs.readdirSync(localeDirectory);
    return fileNames.map((fileName) => fileName.replace(/\.mdx$/, ""));
}
