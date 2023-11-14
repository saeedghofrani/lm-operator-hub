// src/prisma/prisma.service.ts

import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    /**
     * Provides access to the PrismaClient instance for database operations.
     * @returns PrismaClient instance
     */
    getClient(): PrismaClient {
        return this.prisma
    }

    /**
     * Closes the PrismaClient connection when the application is shutting down.
     */
    async onApplicationShutdown() {
        await this.getClient().$disconnect()
    }

    /**
     * Cleans up resources and disconnects the PrismaClient when the service is destroyed.
     */
    async onModuleDestroy() {
        await this.getClient().$disconnect()
    }
}
