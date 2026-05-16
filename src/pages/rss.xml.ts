import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { slugFromId } from "@lib/content";

export async function GET(context: APIContext) {
  const notes = (
    await getCollection("notes", ({ data }) => !data.draft)
  ).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: "Guilherme Oliveira",
    description: "Software engineering notes, projects, and essays.",
    site: context.site ?? "https://guilhermeoliveira.dev",
    items: notes.map((note) => ({
      title: note.data.title,
      description: note.data.summary,
      pubDate: note.data.date,
      link: `/notes/${slugFromId(note.id)}/`,
    })),
  });
}
