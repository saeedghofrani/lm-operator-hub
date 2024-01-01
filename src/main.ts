import {
    INestApplication,
    Logger,
    ValidationPipe,
    VersioningType,
} from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import helmet from 'helmet'
import { AppModule } from './api/app/app.module'
import { AppConfigService } from './config/app/app-config.service'
import { SwaggerConfigService } from './config/swagger/swagger.service'
import { HttpExceptionFilter } from './common/exception/error.exeption'
import { ResponseOkInterceptor } from './common/interceptor/global-response.interceptor'
import { TrimPipe } from './common/pipe/trim.pipe'

async function bootstrap() {
    try {
        const app = await NestFactory.create(AppModule)
        const appConfigService = app.get(AppConfigService)
        const swaggerConfig = app.get(SwaggerConfigService)

        // Set global configuration
        configureApp(app, appConfigService, swaggerConfig)

        // Start the application
        await startApp(app, appConfigService, swaggerConfig)
    } catch (error) {
        Logger.error(`Application failed to start: ${error}`, 'Bootstrap')
    }
}

function configureApp(
    app: INestApplication<any>,
    appConfigService: AppConfigService,
    swaggerConfig: SwaggerConfigService,
) {
    app.useGlobalInterceptors(new ResponseOkInterceptor())
    app.setGlobalPrefix(appConfigService.appApiPrefix)
    // app.useGlobalPipes(new TrimPipe());
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    })
    app.useGlobalFilters(new HttpExceptionFilter(app.getHttpAdapter()))
    app.use(helmet({ crossOriginResourcePolicy: false }))
    app.enableCors({ origin: '*' })
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: { enableImplicitConversion: true },
            forbidNonWhitelisted: true,
            enableDebugMessages: true,
            disableErrorMessages: false,
        }),
    )
    swaggerConfig.init(app)
}

async function startApp(
    app: INestApplication<any>,
    appConfigService: AppConfigService,
    swaggerConfig: SwaggerConfigService,
) {
    await app.listen(appConfigService.appPort)
    Logger.log('Application is running', 'Bootstrap')
    Logger.log(
        `Server: http://127.0.0.1:${appConfigService.appPort}/${appConfigService.appApiPrefix}`,
        'Bootstrap',
    )
    Logger.log(
        `Swagger: http://127.0.0.1:${appConfigService.appPort}/${swaggerConfig.preFix}`,
        'Bootstrap',
    )
}

bootstrap()
