import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RoleService } from '../service/role.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { RoleEntity } from '../entities/role.entity';
import { Prisma } from '@prisma/client';
import { PaginationQueryDto } from 'src/common/pagination/dto/query.dto';

@Controller('role')
@ApiTags('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiCreatedResponse({ type: RoleEntity })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @ApiOkResponse({ type: RoleEntity, isArray: true })
  findAll() {
    return this.roleService.findAll();
  }

  @Get('page')
  pagination(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.roleService.pagination(paginationQueryDto);
  }

  @Get(':id')
  @ApiOkResponse({ type: RoleEntity })
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: RoleEntity })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: RoleEntity })
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
