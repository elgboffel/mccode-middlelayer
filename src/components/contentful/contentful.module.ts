import { CacheModule, Module } from "@nestjs/common";
import { ContentfulController } from "./contentful.controller";
import { ContentfulService } from "./contentful.service";

@Module({
  imports: [
    CacheModule.register({
      ttl: 60 * 60 * 60 * 24,
    }),
  ],
  providers: [ContentfulService],
  controllers: [ContentfulController],
})
export class ContentfulModule {}
