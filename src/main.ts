import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000).then(async () => {
    Logger.log(
      `http://127.0.0.1:3000`,
      'Running Server',
    );
  });
}
bootstrap();