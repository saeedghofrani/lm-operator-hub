import { INestApplication, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import * as fs from 'fs/promises';

@Injectable()
export class SwaggerConfigService {
  constructor(private configService: ConfigService) {}

  get isEnable(): boolean {
    return this.configService.get<string>('SG_IS_ENABLED') === 'true';
  }
  get title(): string {
    return this.configService.get<string>('SG_TITLE');
  }
  get description(): string {
    return this.configService.get<string>('SG_DESCRIPTION');
  }
  get version(): string {
    return this.configService.get<string>('SG_VERSION');
  }
  get preFix(): string {
    return this.configService.get<string>('SG_PREFIX');
  }
  init(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle(this.title)
      .setDescription(this.description)
      .setVersion(this.version)
      .addBearerAuth(
        { type: 'http', scheme: 'Bearer', bearerFormat: 'Token', in: 'header' },
        'access-token',
      )
      .build();
    const options: SwaggerDocumentOptions = {
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey,
    };
    const customOptions: SwaggerCustomOptions = {
      swaggerOptions: {
        persistAuthorization: true,
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
        docExpansion: 'none',
      },
      customSiteTitle: 'mini project',
    };

    const document = SwaggerModule.createDocument(app, config, options);
    fs.writeFile('./swagger-spec.json', JSON.stringify(document));
    SwaggerModule.setup(this.preFix, app, document, customOptions);
  }
}
