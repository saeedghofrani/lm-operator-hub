// password-hasher.service.ts

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'

@Injectable()
export class PasswordHasherService {
    private readonly saltRounds: number

    constructor(configService: ConfigService) {
        this.saltRounds =
            Number(configService.get<number>('BCRYPT_SALT_ROUNDS')) || 10
    }

    /**
     * Hashes a password using bcrypt.
     * @param password - The password to be hashed.
     * @returns A promise that resolves to the hashed password.
     */
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds)
    }

    /**
     * Compares a plain text password with a hashed password.
     * @param plainTextPassword - The plain text password to compare.
     * @param hashedPassword - The hashed password to compare against.
     * @returns A promise that resolves to a boolean indicating whether the passwords match.
     */
    async comparePasswords(
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return bcrypt.compare(plainTextPassword, hashedPassword)
    }
}
