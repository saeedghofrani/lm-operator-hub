import { Module } from '@nestjs/common'
import { RouteService } from './service/route.service'
import { RouteController } from './controller/route.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { RouteRepository } from './repository/route.repository'
import { PaginationService } from 'src/common/pagination/service/create.service'

@Module({
    imports: [PrismaModule],
    controllers: [RouteController],
    providers: [RouteService, RouteRepository, PaginationService],
    exports: [RouteService],
})
export class RouteModule {}
