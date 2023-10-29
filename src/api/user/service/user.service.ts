import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { BaseService } from 'src/common/abstract/service.abstract';
import { PaginationQueryDto } from 'src/common/pagination/dto/query.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRepository } from '../repository/user.repository';
import { PasswordHasherService } from 'src/utilities/crypto/service/hash.service';
import { RoleService } from 'src/api/role/service/role.service';

@Injectable()
export class UserService extends BaseService<User, CreateUserDto, UpdateUserDto> {
  constructor(
    private userRepository: UserRepository,
    private passwordHasher: PasswordHasherService,
    private roleService: RoleService,
    ) {
    super(userRepository);
  }

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await this.passwordHasher.hashPassword(createUserDto.password);
      createUserDto.roles = {
        create: [
          { role: { connect: { id: (await this.roleService.findDefaultRole()).id } } },
        ],
      };
      return this.userRepository.createUser(createUserDto);
    } catch (error) {
      throw error
    }
  }

  async findAll() {
    try {
      return this.userRepository.findAllUser();
    } catch (error) {
      throw error
    }
  }

  async findOne(id: number) {
    try {
      return this.userRepository.findOneUser(id);
    } catch (error) {
      throw error
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return this.userRepository.updateUser(id, updateUserDto);
    } catch (error) {
      throw error
    }
  }

  async remove(id: number) {
    try {
      return this.userRepository.removeUser(id);
    } catch (error) {
      throw error
    }
  }

  async pagination(
    paginationQueryDto: PaginationQueryDto
  ) {
    try {
      if (paginationQueryDto.where) {
        let whereCondition = {
          id: +paginationQueryDto.where.id || undefined,
          name: paginationQueryDto.where.name,
          roles: {
            some: {
              role: {
                name: paginationQueryDto.where.role_name
              }
            }
          }
        };
        paginationQueryDto.where = whereCondition;
      }
      console.log(paginationQueryDto.where);
      
      return this.userRepository.pagination(paginationQueryDto)
    } catch (error) {
      throw error
    }
  }
}
