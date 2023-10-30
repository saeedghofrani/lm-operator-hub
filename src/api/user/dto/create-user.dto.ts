import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDto implements Partial<UserEntity> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiHideProperty()
  roles: {
    create: Array<{
      role: {
        connect: {
          id: number;
        };
      };
    }>;
  };
}
