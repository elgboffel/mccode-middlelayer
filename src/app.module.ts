import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ContentfulModule } from "./components/contentful/contentful.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env.develop",
    }),
    ContentfulModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
