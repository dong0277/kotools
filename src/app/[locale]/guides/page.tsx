import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getAllGuides } from "@/lib/mdx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

export default async function GuidesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations("Navigation");
    const guides = getAllGuides(locale);

    return (
        <div className="container py-10 px-4">
            <div className="mb-10 space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">{t("guides")}</h1>
                <p className="text-muted-foreground">
                    {t("guidesDesc")}
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {guides.map((guide) => (
                    <Link key={guide.slug} href={`/guides/${guide.slug}`}>
                        <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                            <CardHeader>
                                <div className="mb-2 flex gap-2">
                                    {guide.tags.map(tag => (
                                        <span key={tag} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <CardTitle className="line-clamp-2">{guide.title}</CardTitle>
                                <CardDescription className="line-clamp-3 mt-2">
                                    {guide.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {format(new Date(guide.date), "MMMM d, yyyy")}
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {guides.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-muted-foreground">{t("noGuidesFound")}</p>
                </div>
            )}
        </div>
    );
}
