import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { BaseRepository } from 'src/common/abstract/repository.abstract';
import { PaginatedResult } from 'src/common/pagination/interface/result.interface';
import { PaginationService } from 'src/common/pagination/service/create.service';
import { PaginationQueryDto } from 'src/common/pagination/dto/query.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository extends BaseRepository<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    protected prisma: PrismaService,
    private paginationService: PaginationService,
  ) {
    super(prisma);
  }

  get modelName(): string {
    return 'user';
  }

  createUser(createUserDto: CreateUserDto) {
    return this.create(createUserDto);
  }

  findAllUser() {
    return this.findAll();
  }

  findOneUser(id: number) {
    return this.findOne(id);
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    return this.update(id, updateUserDto);
  }

  removeUser(id: number) {
    return this.remove(id);
  }

  pagination(
    paginationQueryDto: PaginationQueryDto,
  ): Promise<PaginatedResult<User>> {
    return this.paginationService.paginate(
      this.prisma.user,
      paginationQueryDto,
    );
  }
}
