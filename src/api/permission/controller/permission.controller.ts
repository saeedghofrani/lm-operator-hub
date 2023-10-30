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
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/pagination/dto/query.dto';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { PermissionEntity } from '../entities/permission.entity';
import { PermissionService } from '../service/permission.service';

@Controller('permission')
@ApiTags('permissions')
@ApiBearerAuth('access-token')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }

  @Post()
  @ApiCreatedResponse({ type: PermissionEntity })
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Get()
  @ApiOkResponse({ type: PermissionEntity, isArray: true })
  findAll() {
    return this.permissionService.findAll();
  }

  @Get('page')
  pagination(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.permissionService.pagination(paginationQueryDto);
  }

  @Get(':id')
  @ApiOkResponse({ type: PermissionEntity })
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: PermissionEntity })
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: PermissionEntity })
  remove(@Param('id') id: string) {
    return this.permissionService.remove(+id);
  }
}