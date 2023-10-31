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
  ApiTags
} from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/pagination/dto/query.dto';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RoleEntity } from '../entities/role.entity';
import { RoleService } from '../service/role.service';

@Controller('role')
@ApiTags('roles')
@ApiBearerAuth('access-token')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({
    summary: 'create role',
    description: 'create role',
    operationId: 'createRole',
  }) 
  @ApiCreatedResponse({ type: RoleEntity })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({
    summary: 'find all role',
    description: 'find all role',
    operationId: 'findAllRole',
  }) 
  @ApiOkResponse({ type: RoleEntity, isArray: true })
  findAll() {
    return this.roleService.findAll();
  }

  @Get('page')
  @ApiOperation({
    summary: 'role pagination',
    description: 'role pagination',
    operationId: 'paginationRole',
  })
  pagination(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.roleService.pagination(paginationQueryDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'find one role by id',
    description: 'find one role by id',
    operationId: 'findOneRole',
  })
  @ApiOkResponse({ type: RoleEntity })
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'update role by id',
    description: 'update role by id',
    operationId: 'updateOneRole',
  })
  @ApiOkResponse({ type: RoleEntity })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'delete role by id',
    description: 'delete role by id',
    operationId: 'deleteOneRole',
  })
  @ApiOkResponse({ type: RoleEntity })
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
