import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/service/prisma.service'
import { CreatePermissionDto } from '../dto/create-permission.dto'
import { UpdatePermissionDto } from '../dto/update-permission.dto'
import { BaseRepository } from 'src/common/abstract/repository.abstract'
import { PaginatedResult } from 'src/common/pagination/interface/result.interface'
import { PaginationService } from 'src/common/pagination/service/create.service'
import { PaginationQueryDto } from 'src/common/pagination/dto/query.dto'
import { Permission, RequestMethod } from '@prisma/client'

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
        super(prisma)
    }

    get modelName(): string {
        return 'permission'
    }

    createPermission(createPermissionDto: CreatePermissionDto) {
        // return await this.prisma.getClient().permission.create({
        //     data: {
        //         roles: {
        //             connect: {id: 1}
        //         }
        //     }
        // })
        return this.create(createPermissionDto)
    }

    findAllPermission() {
        return this.findAll()
    }

    findByAddress(address: string, roleId: number, method: RequestMethod) {
        return this.prisma.getClient().permission.findFirst({
            where: {
                routes: {
                    some: {
                        address,
                        method,
                    },
                },
                roles: {
                    some: {
                        id: roleId,
                    },
                },
            },
        })
    }

    findByRole(roleId: number) {
        return this.prisma.getClient().permission.findMany({
            where: {
                roles: {
                    some: {
                        id: roleId,
                    },
                },
            },
            select: {
                id: true,
            },
        })
    }

    findOnePermission(id: number) {
        return this.findOne(id)
    }

    updatePermission(id: number, updatePermissionDto: UpdatePermissionDto) {
        return this.update(id, updatePermissionDto)
    }

    removePermission(id: number) {
        return this.remove(id)
    }

    pagination(
        paginationQueryDto: PaginationQueryDto,
    ): Promise<PaginatedResult<Permission>> {
        return this.paginationService.paginate(
            this.prisma.getClient().permission,
            paginationQueryDto,
        )
    }
}
