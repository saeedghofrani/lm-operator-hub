import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppConfigService {
    constructor(private configService: ConfigService) {}

    /**
     * Get the port on which the application should listen.
     * @returns The application port as a number.
     */
    get appPort(): number {
        return this.configService.get<number>('APP_PORT')
    }

    /**
     * Get the application's environment mode.
     * @returns The application environment mode as a string.
     */
    get appEnv(): string {
        return this.configService.get<string>('APP_MODE')
    }

    /**
     * Get the API prefix for the application's routes.
     * @returns The API prefix as a string.
     */
    get appApiPrefix(): string {
        return this.configService.get<string>('APP_API_PREFIX')
    }

    /**
     * Get the name of the application.
     * @returns The application name as a string.
     */
    get appName(): string {
        return this.configService.get<string>('APP_NAME')
    }
}
