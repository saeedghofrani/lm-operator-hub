import { INestApplication, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
    DocumentBuilder,
    SwaggerCustomOptions,
    SwaggerDocumentOptions,
    SwaggerModule,
} from '@nestjs/swagger'
import * as fs from 'fs/promises'

@Injectable()
export class SwaggerConfigService {
    constructor(private configService: ConfigService) {}

    /**
     * Check if Swagger documentation is enabled.
     * @returns True if Swagger is enabled, otherwise false.
     */
    get isEnable(): boolean {
        return this.configService.get<string>('SG_IS_ENABLED') === 'true'
    }

    /**
     * Get the title for the Swagger documentation.
     * @returns The title as a string.
     */
    get title(): string {
        return this.configService.get<string>('SG_TITLE')
    }

    /**
     * Get the description for the Swagger documentation.
     * @returns The description as a string.
     */
    get description(): string {
        return this.configService.get<string>('SG_DESCRIPTION')
    }

    /**
     * Get the version for the Swagger documentation.
     * @returns The version as a string.
     */
    get version(): string {
        return this.configService.get<string>('SG_VERSION')
    }

    /**
     * Get the URL prefix for the Swagger documentation.
     * @returns The URL prefix as a string.
     */
    get preFix(): string {
        return this.configService.get<string>('SG_PREFIX')
    }

    /**
     * Initialize Swagger documentation for the application.
     * @param app - The Nest.js application instance.
     */
    init(app: INestApplication) {
        if (!this.isEnable) {
            return // Swagger is disabled, don't proceed.
        }

        const config = this.buildSwaggerConfig()

        const options: SwaggerDocumentOptions = {
            operationIdFactory: (controllerKey: string, methodKey: string) =>
                methodKey,
        }

        const customOptions: SwaggerCustomOptions =
            this.buildCustomSwaggerOptions()

        const document = SwaggerModule.createDocument(app, config, options)
        this.writeSwaggerSpecToFile(document)
        SwaggerModule.setup(this.preFix, app, document, customOptions)
    }

    /**
     * Build the Swagger configuration.
     * @returns A Swagger configuration object.
     */
    private buildSwaggerConfig() {
        return new DocumentBuilder()
            .setTitle(this.title)
            .setDescription(this.description)
            .setVersion(this.version)
            .addBearerAuth(
                {
                    type: 'http',
                    scheme: 'Bearer',
                    bearerFormat: 'Token',
                    in: 'header',
                },
                'access-token',
            )
            .build()
    }

    /**
     * Build custom Swagger options.
     * @returns Custom Swagger options object.
     */
    private buildCustomSwaggerOptions() {
        return {
            swaggerOptions: {
                persistAuthorization: true,
                tagsSorter: 'alpha',
                operationsSorter: 'alpha',
                docExpansion: 'none',
            },
            customSiteTitle: 'mini project',
        }
    }

    /**
     * Write the Swagger specification to a JSON file.
     * @param document - The Swagger document to write.
     */
    private async writeSwaggerSpecToFile(document: any) {
        await fs.writeFile('./swagger-spec.json', JSON.stringify(document))
    }
}
