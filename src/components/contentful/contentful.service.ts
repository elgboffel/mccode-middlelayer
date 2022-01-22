﻿import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { ContentfulClientApi, createClient } from "contentful";
import { Cache } from "cache-manager";
import { Page } from "./models/pages/page.model";
import { IPage } from "./interfaces/contentfulApi/pages/page.interface";
import { PathCollection } from "./models/pages/pathsCollection.model";

@Injectable()
export class ContentfulService {
  private readonly _client: ContentfulClientApi;

  constructor(@Inject(CACHE_MANAGER) private readonly _cacheManager: Cache) {
    this._client =
      this._client ??
      createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN,
      });
  }

  public async getPaths(): Promise<PathCollection> {
    const cachedPaths = await this._cacheManager.get<PathCollection>(
      "PATH_COLLECTION",
    );

    // if (cachedPaths) return cachedPaths;

    const pageCollection = await this.getEntriesWithQuery<IPage[]>({
      content_type: "page",
      locale: "*",
      include: 3,
    });

    return await this._cacheManager.set<PathCollection>(
      "PATH_COLLECTION",
      new PathCollection(pageCollection),
    );
  }

  public async getPage(id: string): Promise<Page> | null {
    const cachedPage = await this._cacheManager.get<Page>(id);

    // if (cachedPage) return cachedPage;

    const page = await this.getEntry<IPage>(id);

    if (!page) return null;

    const model = new Page(page, await this.getPaths());

    return await this._cacheManager.set<Page>(id, model);
  }

  public async getPageBySlug(
    slug: string,
    locale: string,
  ): Promise<Page> | null {
    const cachedPage = await this._cacheManager.get<Page>(slug);

    // if (cachedPage) return cachedPage;

    const page = await this.getEntriesWithQuery<IPage[]>({
      content_type: "page",
      "fields.slug": slug,
      locale,
      include: 6,
    });

    if (!page) return null;

    const model = new Page(page[0], await this.getPaths());

    return await this._cacheManager.set<Page>(slug, model);
  }

  public async getEntry<T>(id: string): Promise<T> {
    try {
      const entry: unknown = await this._client.getEntry<T>(id, { include: 6 });
      return entry as T;
    } catch (e) {
      throw new Error(`getEntry error: ${e}`);
    }
  }

  public async getEntriesWithQuery<T>(query: any): Promise<T> {
    try {
      const entries = await this._client.getEntries(query);

      if (!entries?.items) return null;

      const items: unknown = entries?.items;
      return items as T;
    } catch (e) {
      throw new Error(`getEntriesWithQuery error: ${e}`);
    }
  }

  public async clearPageCache(slug: string) {
    await this._cacheManager.del(slug);
    return {
      message: `Cleared cache for page with slug: ${slug}`,
    };
  }

  public async clearPageCacheBySlugs(slugs: Record<string, string>) {
    const _slugs = Object.values(slugs);

    await this._cacheManager.del("PATH_COLLECTION");

    _slugs.forEach((slug) => this._cacheManager.del(slug));

    return {
      message: `Cleared cache for page with slugs: ${_slugs}`,
    };
  }
}
