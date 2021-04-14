import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
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
    const pageCollection = await this._client.getEntries<IPage>({
      content_type: "page",
      include: 1,
    });

    return new PathCollection((pageCollection?.items as unknown) as IPage[]);
  }

  public async getPage(id: string): Promise<Page> | null {
    const cachedPage = await this._cacheManager.get<Page>(id);

    if (cachedPage) return cachedPage;

    const page = await this.getEntry<IPage>(id);

    if (!page) return null;

    const model = new Page(page);

    return await this._cacheManager.set<Page>(id, model);
  }

  public async getEntry<T>(id: string): Promise<T> {
    const entry: unknown = await this._client.getEntry(id, { include: 6 });
    return entry as T;
  }

  public async clearPageCache(id: string) {
    return await this._cacheManager.del(id);
  }
}
