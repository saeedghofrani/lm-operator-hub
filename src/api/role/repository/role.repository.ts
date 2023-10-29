import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Role } from '@prisma/client';
import { BaseRepository } from 'src/common/abstract/repository.abstract';

@Injectable()
export class RoleRepository extends BaseRepository<Role, CreateRoleDto, UpdateRoleDto> {
    constructor(protected prisma: PrismaService) {
        super(prisma);
    }

    get modelName(): string {
        return 'role';
    }

    createRole(createRoleDto: CreateRoleDto) {
        return this.create(createRoleDto);
    }

    findAllRole() {
        return this.findAll();
    }

    findOneRole(id: number) {
        return this.findOne(id);
    }

    updateRole(id: number, updateRoleDto: UpdateRoleDto) {
        return this.update(id, updateRoleDto);
    }

    removeRole(id: number) {
        return this.remove(id);
    }
}