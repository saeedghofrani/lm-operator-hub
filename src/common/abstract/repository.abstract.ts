import { PrismaService } from 'src/prisma/service/prisma.service'
import { UserInterface } from '../interfaces/user.interface'
import { $Enums } from '@prisma/client'

export abstract class BaseRepository<T, C, A> {
    constructor(protected prisma: PrismaService) {}

    /**
     * Create a new record of the specified model.
     * @param data - The data to create the record.
     * @returns A promise that resolves to the created record.
     */
    async create(data: C): Promise<T> {
        try {
            return await this.prisma
                .getClient()
                [this.modelName].create({ data })
        } catch (error) {
            throw error
        }
    }

    /**
     * Retrieve all records of the specified model.
     * @returns A promise that resolves to an array of records.
     */
    async findAll(): Promise<T[]> {
        try {
            return await this.prisma.getClient()[this.modelName].findMany({
                where: { deleted: null },
            })
        } catch (error) {
            throw error
        }
    }

    /**
     * Retrieve a single record by its ID.
     * @param id - The ID of the record to retrieve.
     * @param include - Optional: Include related data.
     * @returns A promise that resolves to the retrieved record or null if not found.
     */
    async findOne(
        id: number,
        include?: Record<string, any>,
    ): Promise<T | null> {
        try {
            return await this.prisma.getClient()[this.modelName].findUnique({
                where: { id, deleted: null },
            })
        } catch (error) {
            throw error
        }
    }

    /**
     * Update a record by its ID with the provided data.
     * @param id - The ID of the record to update.
     * @param data - The data to update in the record.
     * @returns A promise that resolves to the updated record or null if not found.
     */
    async update(id: number, data: Partial<A>): Promise<T | null> {
        try {
            return await this.prisma
                .getClient()
                [this.modelName].update({ where: { id }, data })
        } catch (error) {
            throw error
        }
    }

    /**
     * Remove a record by its ID. It sets the 'deleted' field to the current date.
     * @param id - The ID of the record to remove.
     * @returns A promise that resolves to the removed record or null if not found.
     */
    async remove(id: number): Promise<T | null> {
        try {
            const existingRecord = await this.prisma
                .getClient()
                [this.modelName].findUnique({
                    where: { id },
                })
            if (!existingRecord) return null
            return this.prisma.getClient()[this.modelName].update({
                where: { id },
                data: { deleted: new Date() },
            })
        } catch (error) {
            throw error
        }
    }

    /**
     * Abstract property that should be implemented by subclasses to provide the model name.
     */
    abstract get modelName(): string
}
