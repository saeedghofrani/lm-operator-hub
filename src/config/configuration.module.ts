import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from '../common/helper/env.helper';
import { AppConfigService } from './app/app-config.service';
import appConfiguration from './app/app-configuration';
import postgresConfiguration from './postgres/postgres.configuration';
import jwtConfiguration from './jwt/jwt-configuration';
import swaggerConfiguration from './swagger/swagger.configuration';
import { SwaggerConfigService } from './swagger/swagger.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvPath(),
      cache: true,
      load: [
        appConfiguration,
        postgresConfiguration,
        swaggerConfiguration,
        jwtConfiguration,
      ],
    }),
  ],
  providers: [AppConfigService, SwaggerConfigService],
  exports: [AppConfigService, SwaggerConfigService],
})
export class ConfigurationModule {}
