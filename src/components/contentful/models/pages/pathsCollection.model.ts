import { IPage } from "../../interfaces/contentfulApi/pages/page.interface";

export class PathCollection {
  constructor(pageCollection?: IPage[]) {
    if (pageCollection)
      this.paths = pageCollection.map((page) => new Path(page));
  }

  paths: Path[] = [];
}

export class Path {
  constructor(page: IPage) {
    this.id = page?.sys?.id;
    this.contentType = page?.sys?.contentType?.sys?.id;
    this.slug = page?.fields?.slug;
    this.locale = page?.sys?.locale;
    this.childPages = page.fields?.childPages
      ? Object.entries(page.fields.childPages).reduce((acc, [k, p]) => {
          acc[k] = p.map((x) => x.sys.id);
          return acc;
        }, {})
      : null;
  }

  id: string;
  contentType: string;
  slug: Record<string, string>;
  locale: string;
  childPages: Record<string, string[]>;
  parents: Record<string, string[]>;
  url: Record<string, string>;
}
