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
  ApiOperation,
  ApiTags,
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
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @ApiCreatedResponse({ type: PermissionEntity })
  @ApiOperation({
    summary: 'create permission',
    description: 'create permission',
    operationId: 'createPermission',
  })
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Get()
  @ApiOperation({
    summary: 'find all permission',
    description: 'find all permission',
    operationId: 'findAllPermission',
  })
  @ApiOkResponse({ type: PermissionEntity, isArray: true })
  findAll() {
    return this.permissionService.findAll();
  }

  @Get('page')
  @ApiOperation({
    summary: 'permission pagination',
    description: 'permission pagination',
    operationId: 'paginationPermission',
  })
  pagination(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.permissionService.pagination(paginationQueryDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'find one permission by id',
    description: 'find one permission by id',
    operationId: 'findOnePermission',
  })
  @ApiOkResponse({ type: PermissionEntity })
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'update permission by id',
    description: 'update permission by id',
    operationId: 'updateOnePermission',
  })
  @ApiOkResponse({ type: PermissionEntity })
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'delete permission by id',
    description: 'delete permission by id',
    operationId: 'deleteOnePermission',
  })
  @ApiOkResponse({ type: PermissionEntity })
  remove(@Param('id') id: string) {
    return this.permissionService.remove(+id);
  }
}
