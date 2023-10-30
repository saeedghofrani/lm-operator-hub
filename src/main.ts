import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './api/app/app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/exception/error.exeption';
import { AppConfigService } from './config/app/app-config.service';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfigService = <AppConfigService>app.get(AppConfigService);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.setGlobalPrefix(appConfigService.appApiPrefix);
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));
  app.use(helmet({crossOriginResourcePolicy: false,}));
  await app.listen(appConfigService.appPort).then(async () => {
    Logger.log(`Swagger Is Enable In development Mode`, 'Swagger');
    Logger.log(`Running`, 'Swagger');
    Logger.log(
      `http://127.0.0.1:${appConfigService.appPort}/${appConfigService.appApiPrefix}`,
      'Running Server',
    );
    Logger.log(
      `http://127.0.0.1:${appConfigService.appPort}/${swaggerConfig.preFix}`,
      'Running Swagger',
    );
  });
}
bootstrap();