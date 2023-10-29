import { PrismaService } from 'src/prisma/prisma.service';

export abstract class BaseRepository<T, C, A> {
    constructor(
        protected prisma: PrismaService
    ) { }

    async create(data: C): Promise<T> {
        return await this.prisma[this.modelName].create({ data });
    }

    async findAll(): Promise<T[]> {
        return await this.prisma[this.modelName].findMany({ where: { deleted: null } });
    }

    async findOne(id: number): Promise<T | null> {
        return await this.prisma[this.modelName].findUnique({ where: { id, deleted: null } });
    }

    async update(id: number, data: Partial<A>): Promise<T | null> {
        return await this.prisma[this.modelName].update({ where: { id }, data });
    }

    async remove(id: number): Promise<T | null> {
        const existingRecord = await this.prisma[this.modelName].findUnique({
            where: { id },
        });
        if (!existingRecord)
            return null;
        return this.prisma[this.modelName].update({
            where: { id },
            data: { deleted: new Date() },
        });
    }

    abstract get modelName(): string;
}