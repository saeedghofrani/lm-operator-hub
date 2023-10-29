import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/pagination/dto/query.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../service/user.service';

@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAll() {
    return this.userService.findAll();
  }

  @Get('page')
  pagination(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.userService.pagination(paginationQueryDto);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserEntity })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}