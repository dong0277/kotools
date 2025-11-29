import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getGuideBySlug, getAllGuideSlugs } from "@/lib/mdx";
import { format } from "date-fns";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams({ params: { locale } }: { params: { locale: string } }) {
    const slugs = getAllGuideSlugs(locale);
    return slugs.map((slug) => ({ slug }));
}

export default async function GuidePage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    const guide = getGuideBySlug(slug, locale);

    if (!guide) {
        notFound();
    }

    return (
        <div className="container py-10 max-w-3xl px-4">
            <Button variant="ghost" size="sm" asChild className="mb-8">
                <Link href="/guides">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Guides
                </Link>
            </Button>

            <article className="prose prose-slate dark:prose-invert max-w-none">
                <div className="mb-8 not-prose">
                    <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl mb-4">
                        {guide.title}
                    </h1>
                    <div className="flex items-center gap-4 text-muted-foreground text-sm">
                        <time dateTime={guide.date}>
                            {format(new Date(guide.date), "MMMM d, yyyy")}
                        </time>
                        <div className="flex gap-2">
                            {guide.tags.map(tag => (
                                <span key={tag} className="bg-muted px-2 py-1 rounded-md text-xs font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <MDXRemote source={guide.content} />
            </article>
        </div>
    );
}
