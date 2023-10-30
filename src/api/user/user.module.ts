import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserRepository } from './repository/user.repository';
import { PaginationService } from 'src/common/pagination/service/create.service';
import { PasswordHasherService } from 'src/utilities/crypto/service/hash.service';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [PrismaModule, RoleModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    PaginationService,
    PasswordHasherService,
  ],
})
export class UserModule {}
