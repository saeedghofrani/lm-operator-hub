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
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/pagination/dto/query.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../service/user.service';
import { LoginDto } from '../dto/login.dto';
import { Public } from 'src/common/decorator/public-metadata.decorator';
import { GetUser } from 'src/common/decorator/user.decorator';
import { UserInterface } from 'src/common/interfaces/user.interface';
import { RoleDto } from 'src/api/role/dto/role.dto';
import { PublicPermission } from 'src/common/decorator/public-permission-metadata.decorator';

@Controller('user')
@ApiTags('users')
@ApiBearerAuth('access-token')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @Public()
  @PublicPermission()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @PublicPermission()
  @Get('role/:id')
  setRole(@GetUser() userInterface: UserInterface, @Param('id') id: number) {
    return this.userService.setRole(userInterface, id);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch()
  @ApiOkResponse({ type: UserEntity })
  update(@GetUser() userInterface: UserInterface, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+userInterface.user, updateUserDto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserEntity })
  addRole(@Param('id') id: string, @Body() addRoleDto: RoleDto) {
    return this.userService.addRole(+id, addRoleDto.roleId);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
