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
  }

  id: string;
  contentType: string;
  slug: string;
  locale: string;
}
