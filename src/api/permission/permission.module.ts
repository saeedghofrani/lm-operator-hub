import { Module } from '@nestjs/common'
import { PermissionService } from './service/permission.service'
import { PermissionController } from './controller/permission.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { PermissionRepository } from './repository/permission.repository'
import { PaginationService } from 'src/common/pagination/service/create.service'

@Module({
    imports: [PrismaModule],
    controllers: [PermissionController],
    providers: [PermissionService, PermissionRepository, PaginationService],
    exports: [PermissionService],
})
export class PermissionModule {}
