import { EntryBase } from "../base/entryBase.model";
import { IPage } from "../../interfaces/contentfulApi/pages/page.interface";
import { ImageField } from "../fields/imageField.model";
import { Components } from "../components.model";
import { ComponentType } from "../componentType.model";
import { PathCollection } from "./pathsCollection.model";

export class Page extends EntryBase {
  constructor(pageArgs: IPage, Paths?: PathCollection) {
    super(pageArgs?.sys);

    const path = Paths.paths.find((x) => x.id === this.id);

    this.urls = path.urls?.[this.locale];
    this.slug = pageArgs?.fields?.slug?.[this.locale];
    this.heading = pageArgs?.fields?.heading ?? null;
    this.description = pageArgs?.fields?.description ?? null;
    this.image = pageArgs?.fields?.image
      ? new ImageField(pageArgs.fields.image)
      : null;
    this.modules = pageArgs?.fields?.content
      ? new Components(pageArgs.fields.content)?.list
      : null;

    this.metaDescription = null;
    this.nofollow = null;
    this.noindex = null;
    this.title = null;
  }

  urls: string[];
  slug: string;
  heading: string;
  description: string;
  image: ImageField;
  modules: ComponentType[];

  canonical: string;
  metaDescription: string;
  nofollow: boolean;
  noindex: boolean;
  title: string;
}
