import { Entry as ContentfulEntry } from "contentful";

export type Entry<T> = Omit<ContentfulEntry<T>, "toPlainObject" | "update">;
