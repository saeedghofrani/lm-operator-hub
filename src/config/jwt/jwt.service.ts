import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtConfigService {
    constructor(private configService: ConfigService) {}

    /**
     * Get the JWT secret key used for token signing and verification.
     * @returns The JWT secret key as a string.
     */
    get secret(): string {
        return this.configService.get<string>('JWT_SECRET')
    }

    /**
     * Get the JWT token expiration time in hours.
     * @returns The JWT token expiration time in hours as a number.
     */
    get expirationHours(): number {
        return this.configService.get<number>('JWT_EXP_H')
    }

    /**
     * Get the JWT token expiration time in days.
     * @returns The JWT token expiration time in days as a number.
     */
    get expirationDays(): number {
        return this.configService.get<number>('JWT_EXP_D')
    }
}
