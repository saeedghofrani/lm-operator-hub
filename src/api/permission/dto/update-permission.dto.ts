import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CreatePermissionDto } from './create-permission.dto';
import { $Enums } from '@prisma/client';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
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
  @IsEnum($Enums.ReadAccess) 
  read: $Enums.ReadAccess;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  routeIds: string[];
}
