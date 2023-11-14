import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { getEnvPath } from '../common/helper/env.helper'
import { AppConfigService } from './app/app-config.service'
import appConfiguration from './app/app-configuration'
import postgresConfiguration from './postgres/postgres.configuration'
import jwtConfiguration from './jwt/jwt-configuration'
import swaggerConfiguration from './swagger/swagger.configuration'
import { SwaggerConfigService } from './swagger/swagger.service'
import { JwtConfigService } from './jwt/jwt.service'
import { validationSchema } from 'src/common/helper/env-validation.helper'

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
            validationSchema,
        }),
    ],
    providers: [AppConfigService, SwaggerConfigService, JwtConfigService],
    exports: [AppConfigService, SwaggerConfigService, JwtConfigService],
})
export class ConfigurationModule {}
