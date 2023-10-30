import { PrismaService } from 'src/prisma/service/prisma.service';

export abstract class BaseRepository<T, C, A> {
  constructor(protected prisma: PrismaService) {}

  async create(data: C): Promise<T> {
    try {
      return await this.prisma.getClient()[this.modelName].create({ data });
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<T[]> {
    try {
      return await this.prisma.getClient()[this.modelName].findMany({
        where: { deleted: null },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number, include?: Record<string, any>): Promise<T | null> {
    try {
      return await this.prisma.getClient()[this.modelName].findUnique({
        where: { id, deleted: null }
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, data: Partial<A>): Promise<T | null> {
    try {
      return await this.prisma.getClient()[this.modelName].update({ where: { id }, data });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<T | null> {
    try {
      const existingRecord = await this.prisma.getClient()[this.modelName].findUnique({
        where: { id },
      });
      if (!existingRecord) return null;
      return this.prisma.getClient()[this.modelName].update({
        where: { id },
        data: { deleted: new Date() },
      });
    } catch (error) {
      throw error;
    }
  }

  abstract get modelName(): string;
}
