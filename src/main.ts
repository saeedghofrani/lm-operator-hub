import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app/app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('License Market')
    .setDescription('mini project')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3000).then(async () => {
    Logger.log(
      `http://127.0.0.1:3000`,
      'Running Server',
    );
    Logger.log(
      `http://127.0.0.1:3000/doc`,
      'Running Swagger',
    );
  });
}
bootstrap();