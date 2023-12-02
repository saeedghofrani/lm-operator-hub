import { Injectable } from '@nestjs/common'
import { BaseRepository } from './repository.abstract'

@Injectable()
export abstract class BaseService<T, C, A> {
    constructor(private repository: BaseRepository<T, C, A>) {}

    /**
     * Create a new record using the provided DTO.
     * @param createDto - Data to create the record.
     * @returns A promise that resolves to the created record.
     */
    async create(createDto: C): Promise<T> {
        return this.repository.create(createDto)
    }

    /**
     * Retrieve all records.
     * @returns A promise that resolves to an array of records.
     */
    async findAll(): Promise<T[]> {
        return this.repository.findAll()
    }

    /**
     * Retrieve a single record by its ID.
     * @param id - The ID of the record to retrieve.
     * @returns A promise that resolves to the retrieved record or null if not found.
     */
    async findOne(id: number): Promise<T | null> {
        return this.repository.findOne(id)
    }

    /**
     * Update a record by its ID with the provided DTO.
     * @param id - The ID of the record to update.
     * @param updateDto - Data to update the record.
     * @returns A promise that resolves to the updated record or null if not found.
     */
    async update(id: number, updateDto: A): Promise<T | null> {
        return this.repository.update(id, updateDto)
    }

    /**
     * Remove a record by its ID.
     * @param id - The ID of the record to remove.
     * @returns A promise that resolves to the removed record or null if not found.
     */
    async remove(id: number): Promise<T | null> {
        return this.repository.remove(id)
    }
}
