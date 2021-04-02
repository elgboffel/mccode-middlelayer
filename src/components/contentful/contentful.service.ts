import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { ContentfulClientApi, createClient, Entry } from "contentful";
import { Cache } from "cache-manager";
import { Page } from "./models/pages/page.model";
import { IPage } from "./interfaces/contentfulApi/pages/page.interface";

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

  public async getPage(id: string): Promise<Page> | null {
    const cachedEntry = await this._cacheManager.get<Page>(id);

    // if (cachedEntry) return cachedEntry;

    const page: Entry<unknown> = await this._client.getEntry(id);

    if (!page) return null;

    const model = new Page(page as IPage);

    return await this._cacheManager.set<Page>(id, model);
  }

  public async clearPageCache(id: string) {
    return await this._cacheManager.del(id);
  }
}
