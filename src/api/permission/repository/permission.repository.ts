import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { BaseRepository } from 'src/common/abstract/repository.abstract';
import { PaginatedResult } from 'src/common/pagination/interface/result.interface';
import { PaginationService } from 'src/common/pagination/service/create.service';
import { PaginationQueryDto } from 'src/common/pagination/dto/query.dto';
import { Permission } from '@prisma/client';

@Injectable()
export class PermissionRepository extends BaseRepository<
  Permission,
  CreatePermissionDto,
  UpdatePermissionDto
> {
  constructor(
    protected prisma: PrismaService,
    private paginationService: PaginationService,
  ) {
    super(prisma);
  }

  get modelName(): string {
    return 'permission';
  }

  createPermission(createPermissionDto: CreatePermissionDto) {
    return this.create(createPermissionDto);
  }

  findAllPermission() {
    return this.findAll();
  }

  findOnePermission(id: number) {
    return this.findOne(id);
  }

  updatePermission(id: number, updatePermissionDto: UpdatePermissionDto) {
    return this.update(id, updatePermissionDto);
  }

  removePermission(id: number) {
    return this.remove(id);
  }

  pagination(
    paginationQueryDto: PaginationQueryDto,
  ): Promise<PaginatedResult<Permission>> {
    return this.paginationService.paginate(
      this.prisma.permission,
      paginationQueryDto,
    );
  }
}
