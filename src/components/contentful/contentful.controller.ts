import { Req, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ContentfulService } from "./contentful.service";
import { ApiResponse } from "@nestjs/swagger";
import { ApiAuthGuard } from "../../common/apiAuth.guard";
import { Webhook } from "./models/webhook.model";

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

  @Post("page/clear-cache")
  @ApiResponse({
    status: 200,
  })
  async clearPageCache(@Req() req: Webhook) {
    return await this._contentfulService.clearPageCache(req?.body?.entityId);
  }
}
