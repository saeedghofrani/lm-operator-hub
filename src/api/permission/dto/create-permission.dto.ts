import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { PermissionEntity } from '../entities/permission.entity';

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

  @ApiHideProperty()
  route: Record<string, any>

  @ApiHideProperty()
  role: Record<string, any>
}