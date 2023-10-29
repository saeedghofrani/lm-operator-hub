import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RoleRepository } from '../repository/role.repository';
import { BaseService } from 'src/common/abstract/service.abstract';
import { Role } from '@prisma/client';

@Injectable()
export class RoleService extends BaseService<Role, CreateRoleDto, UpdateRoleDto> {
  constructor(private roleRepository: RoleRepository) {
    super(roleRepository);
  }

  async create(createRoleDto: CreateRoleDto) {
    try {
      return this.roleRepository.createRole(createRoleDto);
    } catch (error) {
      throw error
    }
  }

  async findAll() {
    try {
      return this.roleRepository.findAllRole();
    } catch (error) {
      throw error
    }
  }

  async findOne(id: number) {
    try {
      return this.roleRepository.findOneRole(id);
    } catch (error) {
      throw error
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      return this.roleRepository.updateRole(id, updateRoleDto);
    } catch (error) {
      throw error
    }
  }

  async remove(id: number) {
    try {
      return this.roleRepository.removeRole(id);
    } catch (error) {
      throw error
    }
  }
}