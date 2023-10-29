import { PrismaService } from 'src/prisma/prisma.service';

export abstract class BaseRepository<T, C, A> {
    constructor(protected prisma: PrismaService) { }

    async create(data: C): Promise<T> {
        return this.prisma[this.modelName].create({ data });
    }

    async findAll(): Promise<T[]> {
        return this.prisma[this.modelName].findMany({});
    }

    async findOne(id: number): Promise<T | null> {
        return this.prisma[this.modelName].findUnique({ where: { id } });
    }

    async update(id: number, data: Partial<A>): Promise<T | null> {
        return this.prisma[this.modelName].update({ where: { id }, data });
    }

    async remove(id: number): Promise<T | null> {
        return this.prisma[this.modelName].delete({ where: { id } });
    }

    abstract get modelName(): string;
}