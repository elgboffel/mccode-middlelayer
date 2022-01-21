import { EntryBase } from "../base/entryBase.model";
import { IPage } from "../../interfaces/contentfulApi/pages/page.interface";
import { Components } from "../components.model";
import { ComponentType } from "../componentType.model";
import { PathCollection } from "./pathsCollection.model";

export class Page extends EntryBase {
  constructor(pageArgs: IPage, Paths?: PathCollection) {
    super(pageArgs?.sys);

    const path = Paths?.paths.find((x) => x.id === this.id);

    this.urls = path?.urls?.[this.locale] ?? null;
    this.modules = pageArgs?.fields?.content
      ? new Components(pageArgs.fields.content)?.list
      : null;
    this.title = pageArgs?.fields?.title;

    this.metaDescription = null;
    this.nofollow = null;
    this.noindex = null;
  }

  urls: string[];
  slug: string;
  title: string;

  modules: ComponentType[];

  canonical: string;
  metaDescription: string;
  nofollow: boolean;
  noindex: boolean;
}
