import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/service/prisma.service'
import { CreateRouteDto } from '../dto/create-route.dto'
import { UpdateRouteDto } from '../dto/update-route.dto'
import { BaseRepository } from 'src/common/abstract/repository.abstract'
import { PaginatedResult } from 'src/common/pagination/interface/result.interface'
import { PaginationService } from 'src/common/pagination/service/create.service'
import { PaginationQueryDto } from 'src/common/pagination/dto/query.dto'
import { Route } from '@prisma/client'

@Injectable()
export class RouteRepository extends BaseRepository<
    Route,
    CreateRouteDto,
    UpdateRouteDto
> {
    constructor(
        protected prisma: PrismaService,
        private paginationService: PaginationService,
    ) {
        super(prisma)
    }

    get modelName(): string {
        return 'route'
    }

    createRoute(createRouteDto: CreateRouteDto) {
        return this.create(createRouteDto)
    }

    findAllRoute() {
        return this.findAll()
    }

    findOneRoute(id: number) {
        return this.findOne(id)
    }

    updateRoute(id: number, updateRouteDto: UpdateRouteDto) {
        return this.update(id, updateRouteDto)
    }

    removeRoute(id: number) {
        return this.remove(id)
    }

    pagination(
        paginationQueryDto: PaginationQueryDto,
    ): Promise<PaginatedResult<Route>> {
        return this.paginationService.paginate(
            this.prisma.getClient().route,
            paginationQueryDto,
        )
    }
}
