import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { slugFromId } from "@lib/content";

export async function GET(context: APIContext) {
  const articles = (
    await getCollection("articles", ({ data }) => !data.draft)
  ).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: "Guilherme Oliveira",
    description: "Software engineering notes, projects, and essays.",
    site: context.site ?? "https://guilhermeoliveira.dev",
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.summary,
      pubDate: article.data.date,
      link: `/articles/${slugFromId(article.id)}/`,
    })),
  });
}
