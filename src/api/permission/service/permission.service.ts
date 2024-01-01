import { Injectable } from '@nestjs/common';
import { $Enums, Permission, RequestMethod } from '@prisma/client';
import { BaseService } from 'src/common/abstract/service.abstract';
import { PaginationQueryDto } from 'src/common/pagination/dto/query.dto';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { PermissionRepository } from '../repository/permission.repository';

@Injectable()
export class PermissionService extends BaseService<
    Permission,
    CreatePermissionDto,
    UpdatePermissionDto
> {
    constructor(private permissionRepository: PermissionRepository) {
        super(permissionRepository);
    }

    async create(createPermissionDto: CreatePermissionDto) {
        try {
            createPermissionDto.roles = {
                connect: {
                    id: Number(createPermissionDto.roleId)
                },
            };
            const routes = createPermissionDto.routeIds.map((item) => {
                return { id: Number(item) };
            });
            createPermissionDto.routes = {
                connect: routes,
            };
            delete createPermissionDto.routeIds;
            delete createPermissionDto.roleId;
            console.log(createPermissionDto);
            return this.permissionRepository.createPermission(
                createPermissionDto
            );
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            return this.permissionRepository.findAllPermission();
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: number) {
        try {
            return this.permissionRepository.findOnePermission(id);
        } catch (error) {
            throw error;
        }
    }

    async findByAddress(
        address: string,
        roleId: number,
        method: RequestMethod
    ) {
        try {
            return await this.permissionRepository.findByAddress(
                address,
                roleId,
                method
            );
        } catch (error) {
            throw error;
        }
    }

    async findByRole(roleId: number) {
        try {
            return await this.permissionRepository.findByRole(roleId);
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, updatePermissionDto: UpdatePermissionDto) {
        try {
            updatePermissionDto.roles = {
                connect: {
                    id: Number(updatePermissionDto.roleId)
                },
            };
            const routes = updatePermissionDto.routeIds.map((item) => {
                return { id: Number(item) };
            });
            updatePermissionDto.routes = {
                connect: routes,
            };
            delete updatePermissionDto.routeIds;
            delete updatePermissionDto.roleId;
            return this.permissionRepository.updatePermission(
                id,
                updatePermissionDto
            );
        } catch (error) {
            throw error;
        }
    }

    async remove(id: number) {
        try {
            return this.permissionRepository.removePermission(id);
        } catch (error) {
            throw error;
        }
    }

    async pagination(paginationQueryDto: PaginationQueryDto) {
        try {
            if (paginationQueryDto.where) {
                let whereCondition = {
                    id: +paginationQueryDto.where.id || undefined,
                };
                paginationQueryDto.where = whereCondition;
            }
            return this.permissionRepository.pagination(paginationQueryDto);
        } catch (error) {
            throw error;
        }
    }
}
