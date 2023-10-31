import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PermissionEntity } from '../entities/permission.entity';
import { $Enums } from '@prisma/client';

export class CreatePermissionDto implements Partial<PermissionEntity> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  roleId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  routeIds: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum($Enums.ReadAccess)
  read: $Enums.ReadAccess;

  @ApiHideProperty()
  route: Record<string, any>;

  @ApiHideProperty()
  role: Record<string, any>;
}
