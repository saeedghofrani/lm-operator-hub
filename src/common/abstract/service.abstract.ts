import { Injectable } from '@nestjs/common';
import { BaseRepository } from './repository.abstract';

@Injectable()
export abstract class BaseService<T, C, A> {
    constructor(private repository: BaseRepository<T, C, A>) { }

    async create(createDto: C) {
        return this.repository.create(createDto);
    }

    async findAll() {
        return this.repository.findAll();
    }

    async findOne(id: number) {
        return this.repository.findOne(id);
    }

    async update(id: number, updateDto: A) {
        return this.repository.update(id, updateDto);
    }

    async remove(id: number) {
        return this.repository.remove(id);
    }
}