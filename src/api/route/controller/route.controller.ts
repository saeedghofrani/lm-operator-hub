import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger'
import { PaginationQueryDto } from 'src/common/pagination/dto/query.dto'
import { CreateRouteDto } from '../dto/create-route.dto'
import { UpdateRouteDto } from '../dto/update-route.dto'
import { RouteEntity } from '../entities/route.entity'
import { RouteService } from '../service/route.service'

@Controller('route')
@ApiTags('routes')
@ApiBearerAuth('access-token')
export class RouteController {
    constructor(private readonly routeService: RouteService) {}

    @Post()
    @ApiOperation({
        summary: 'create route',
        description: 'create route',
        operationId: 'createRoute',
    })
    @ApiCreatedResponse({ type: RouteEntity })
    create(@Body() createRouteDto: CreateRouteDto) {
        return this.routeService.create(createRouteDto)
    }

    @Get()
    @ApiOperation({
        summary: 'find all route',
        description: 'find all route',
        operationId: 'findAllRoute',
    })
    @ApiOkResponse({ type: RouteEntity, isArray: true })
    findAll() {
        return this.routeService.findAll()
    }

    @Get('page')
    @ApiOperation({
        summary: 'route pagination',
        description: 'route pagination',
        operationId: 'paginationRoute',
    })
    pagination(@Query() paginationQueryDto: PaginationQueryDto) {
        return this.routeService.pagination(paginationQueryDto)
    }

    @Get(':id')
    @ApiOperation({
        summary: 'find one route by id',
        description: 'find one route by id',
        operationId: 'findOneRoute',
    })
    @ApiOkResponse({ type: RouteEntity })
    findOne(@Param('id') id: string) {
        return this.routeService.findOne(+id)
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'update route by id',
        description: 'update route by id',
        operationId: 'updateOneRoute',
    })
    @ApiOkResponse({ type: RouteEntity })
    update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
        return this.routeService.update(+id, updateRouteDto)
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'delete route by id',
        description: 'delete route by id',
        operationId: 'deleteOneRoute',
    })
    @ApiOkResponse({ type: RouteEntity })
    remove(@Param('id') id: string) {
        return this.routeService.remove(+id)
    }
}
