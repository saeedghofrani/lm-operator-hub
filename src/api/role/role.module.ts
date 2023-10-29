import { Module } from '@nestjs/common';
import { RoleService } from './service/role.service';
import { RoleController } from './controller/role.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}