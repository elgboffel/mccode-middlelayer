import { IPage } from "../../interfaces/contentfulApi/pages/page.interface";
import { isEmptyObject } from "../../../../common/helpers/is-empty-object";

export class PathCollection {
  constructor(pageCollection?: IPage[]) {
    if (pageCollection)
      this.paths = pageCollection?.map((page) => new Path(page));

    if (this.paths) {
      this.paths = PathCollection.populatePathsWithParents(this.paths);
      this.paths = this.populatePathsWithUrls(this.paths);
    }
  }

  static populatePathsWithParents(paths: Path[]) {
    return paths.map((path) => {
      const parents = paths
        .filter((x) =>
          x.childPages
            ? Object.entries(x.childPages).filter(([key, pages]) =>
                pages.includes(path.id),
              )
            : false,
        )
        .reduce((prev, value) => {
          if (!value.childPages) return prev;

          Object.entries(value.childPages).forEach(([key, pages]) => {
            if (pages.includes(path.id))
              prev[key] = [...(prev[key] ? prev[key] : []), value.id];
          });
          return prev;
        }, {});

      return {
        ...path,
        parents: isEmptyObject(parents) ? null : parents,
      };
    });
  }

  populatePathsWithUrls(paths: Path[]) {
    return paths.map((path) => ({
      ...path,
      urls: Object.entries(path.slug)?.reduce((prev, [key, slug]) => {
        if (!key || !slug) return prev;
        prev[key] = this.buildUrl(path, [slug], key);
        return prev;
      }, {}),
    }));
  }

  buildUrl(path: Path, slugs: string[], locale: string) {
    const localeParents = path?.parents?.[locale];

    if (!localeParents)
      return [
        slugs.reduce(
          (prev, slug) => `${prev}${slug === "/" ? "" : "/" + slug}`,
          `/${locale}`,
        ),
      ];

    return localeParents.reduce((prev, parentId) => {
      const parent = this.paths.find((x) => x.id === parentId);
      const slug = parent.slug[locale];
      prev.push(
        ...this.buildUrl(parent, [...(slug ? [slug] : []), ...slugs], locale),
      );
      return prev;
    }, []);
  }

  paths: Path[] = [];
}

export class Path {
  constructor(page?: IPage) {
    this.id = page?.sys?.id ?? null;
    this.contentType = page?.sys?.contentType?.sys?.id ?? null;
    this.slug = page?.fields?.slug ?? null;
    this.locale = page?.sys?.locale ?? null;
    this.childPages = page.fields?.childPages
      ? Object.entries(page.fields.childPages).reduce((prev, [key, page]) => {
          prev[key] = page.map((x) => x.sys.id);
          return prev;
        }, {})
      : null;
  }

  id: string;
  contentType: string;
  slug: Record<string, string>;
  locale: string;
  childPages: Record<string, string[]>;
  parents: Record<string, string[]>;
  urls: Record<string, string[]>;
}
