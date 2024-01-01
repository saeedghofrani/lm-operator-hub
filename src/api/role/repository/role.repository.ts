import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/service/prisma.service'
import { CreateRoleDto } from '../dto/create-role.dto'
import { UpdateRoleDto } from '../dto/update-role.dto'
import { BaseRepository } from 'src/common/abstract/repository.abstract'
import { PaginatedResult } from 'src/common/pagination/interface/result.interface'
import { PaginationService } from 'src/common/pagination/service/create.service'
import { PaginationQueryDto } from 'src/common/pagination/dto/query.dto'
import { Role } from '@prisma/client'

@Injectable()
export class RoleRepository extends BaseRepository<
    Role,
    CreateRoleDto,
    UpdateRoleDto
> {
    constructor(
        protected prisma: PrismaService,
        private paginationService: PaginationService,
    ) {
        super(prisma)
    }

    get modelName(): string {
        return 'role'
    }

    createRole(createRoleDto: CreateRoleDto) {
        return this.create(createRoleDto)
    }

    findAllRole() {
        return this.findAll()
    }

    findOneRole(id: number) {
        return this.findOne(id)
    }

    findDefaultRole() {
        return this.prisma
            .getClient()
            .role.findFirst({ where: { default: true } })
    }

    updateRole(id: number, updateRoleDto: UpdateRoleDto) {
        return this.update(id, updateRoleDto)
    }

    removeRole(id: number) {
        return this.remove(id)
    }

    pagination(
        paginationQueryDto: PaginationQueryDto,
    ): Promise<PaginatedResult<Role>> {
        return this.paginationService.paginate(
            this.prisma.getClient().role,
            paginationQueryDto,
        )
    }
}
