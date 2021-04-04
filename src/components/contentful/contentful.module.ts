import { CacheModule, Module } from "@nestjs/common";
import { ContentfulController } from "./contentful.controller";
import { ContentfulService } from "./contentful.service";
import { ComponentFactory } from "./factories/component.factory";

@Module({
  imports: [
    CacheModule.register({
      ttl: 60 * 60 * 60 * 24,
    }),
    ComponentFactory,
  ],
  providers: [ContentfulService],
  controllers: [ContentfulController],
})
export class ContentfulModule {}
