import {
  Req,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Query,
} from "@nestjs/common";
import { ContentfulService } from "./contentful.service";
import { ApiResponse } from "@nestjs/swagger";
import { Webhook } from "./models/webhook.model";
import { ApiAuthGuard } from "../../common/apiAuth.guard";

@UseGuards(ApiAuthGuard)
@Controller("contentful")
export class ContentfulController {
  constructor(private readonly _contentfulService: ContentfulService) {}

  @Get("pages/get-paths")
  async getPaths(): Promise<unknown> {
    return await this._contentfulService.getPaths();
  }

  @Get("page/:pageId")
  async getPage(@Param("pageId") pageId: string): Promise<unknown> {
    return await this._contentfulService.getPage(pageId);
  }

  @Get("page/by-slug/:locale/:slug")
  async getPageBySlug(
    @Param("locale") locale: string,
    @Param("slug") slug: string,
  ): Promise<unknown> {
    return await this._contentfulService.getPageBySlug(slug, locale);
  }

  @Post("page/clear-cache-by-id")
  @ApiResponse({
    status: 200,
  })
  async clearPageCache(@Req() req: Webhook) {
    return await this._contentfulService.clearPageCache(req?.body?.entityId);
  }

  @Post("page/clear-cache-by-slugs")
  @ApiResponse({
    status: 200,
  })
  async clearPageCacheBySlug(@Req() req: Webhook) {
    return await this._contentfulService.clearPageCacheBySlugs(
      req?.body?.slugs,
    );
  }
}
