import { CACHE_MANAGER, Inject, Injectable, Optional } from "@nestjs/common";
import { ContentfulClientApi, createClient } from "contentful";
import { Cache } from "cache-manager";
import { Page } from "./models/pages/page.model";
import { IPage } from "./interfaces/contentfulApi/pages/page.interface";
import { ComponentAlias } from "./interfaces/contentfulApi/components/componentAlias.enum";
import { IColumns } from "./interfaces/contentfulApi/components/columns.interface";
import { Columns } from "./models/components/columns.model";
import { Components } from "./models/components.model";

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
    const cachedPage = await this._cacheManager.get<Page>(id);

    if (cachedPage) return cachedPage;

    const page = await this.getEntry<IPage>(id);

    if (!page) return null;

    const model = new Page(page);

    for (const component of model.content) {
      if (component.contentType === ComponentAlias.Columns) {
        const columns = component as Columns;
        const entry: IColumns = await this._client.getEntry(columns.id);

        columns.components = new Components(entry.fields.components).list;
      }
    }

    return await this._cacheManager.set<Page>(id, model);
  }

  public async getEntry<T>(id: string): Promise<T> {
    const entry: unknown = await this._client.getEntry(id);
    return entry as T;
  }

  public async clearPageCache(id: string) {
    return await this._cacheManager.del(id);
  }
}
