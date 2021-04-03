import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as compression from "compression";
import * as helmet from "helmet";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.setGlobalPrefix("api");

  app.use(compression());

  const config = new DocumentBuilder()
    .setTitle("McCode Middlelayer")
    .setDescription("McCode Middlelayer API description")
    .addTag("mccode-middlelayer")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(process.env.PORT || 8080);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
