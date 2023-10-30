import { Module } from '@nestjs/common';
import { PaginationService } from 'src/common/pagination/service/create.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PasswordHasherService } from 'src/utilities/crypto/service/hash.service';
import { RoleModule } from '../role/role.module';
import { UserController } from './controller/user.controller';
import { UserRepository } from './repository/user.repository';
import { UserService } from './service/user.service';

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
