import { Module } from '@nestjs/common'
import { RoleService } from './service/role.service'
import { RoleController } from './controller/role.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { RoleRepository } from './repository/role.repository'
import { PaginationService } from 'src/common/pagination/service/create.service'

@Module({
    imports: [PrismaModule],
    controllers: [RoleController],
    providers: [RoleService, RoleRepository, PaginationService],
    exports: [RoleService],
})
export class RoleModule {}
