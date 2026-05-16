import { getCollection, type CollectionEntry } from "astro:content";
export { readingTime } from "./reading-time";

export type WithSlug<T> = T & { slug: string };
export type Project = WithSlug<CollectionEntry<"projects">>;
export type Article = WithSlug<CollectionEntry<"articles">>;
export type Idea = WithSlug<CollectionEntry<"ideas">>;

export function slugFromId(id: string) {
  return id.replace(/\.(md|mdx)$/, "");
}

function withSlug<T extends { id: string }>(entry: T): WithSlug<T> {
  return { ...entry, slug: slugFromId(entry.id) };
}

function byDateDesc<T extends { data: { date: Date } }>(a: T, b: T) {
  return b.data.date.valueOf() - a.data.date.valueOf();
}

export async function getProjects() {
  return (await getCollection("projects", ({ data }) => !data.draft))
    .map(withSlug)
    .sort(byDateDesc);
}

export async function getArticles() {
  return (await getCollection("articles", ({ data }) => !data.draft))
    .map(withSlug)
    .sort(byDateDesc);
}

export async function getIdeas() {
  return (await getCollection("ideas", ({ data }) => !data.draft))
    .map(withSlug)
    .sort(byDateDesc);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatMonth(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
