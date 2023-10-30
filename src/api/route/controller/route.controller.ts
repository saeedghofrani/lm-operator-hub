import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/pagination/dto/query.dto';
import { CreateRouteDto } from '../dto/create-route.dto';
import { UpdateRouteDto } from '../dto/update-route.dto';
import { RouteEntity } from '../entities/route.entity';
import { RouteService } from '../service/route.service';

@Controller('route')
@ApiTags('routes')
export class RouteController {
  constructor(private readonly routeService: RouteService) { }

  @Post()
  @ApiCreatedResponse({ type: RouteEntity })
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.routeService.create(createRouteDto);
  }

  @Get()
  @ApiOkResponse({ type: RouteEntity, isArray: true })
  findAll() {
    return this.routeService.findAll();
  }

  @Get('page')
  pagination(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.routeService.pagination(paginationQueryDto);
  }

  @Get(':id')
  @ApiOkResponse({ type: RouteEntity })
  findOne(@Param('id') id: string) {
    return this.routeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: RouteEntity })
  update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
    return this.routeService.update(+id, updateRouteDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: RouteEntity })
  remove(@Param('id') id: string) {
    return this.routeService.remove(+id);
  }
}