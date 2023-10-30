import { ApiProperty } from '@nestjs/swagger';
import { Permission } from 'prisma/prisma-client';
import { BaseEntity } from 'src/common/entities/base.entity';

export class PermissionEntity extends BaseEntity implements Permission {
  @ApiProperty() name: string;
  @ApiProperty() deleted: Date;
  @ApiProperty() id: number;
}
