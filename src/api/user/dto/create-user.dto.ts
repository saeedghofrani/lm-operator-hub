import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator'
import { UserEntity } from '../entities/user.entity'

export class CreateUserDto implements Partial<UserEntity> {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string

    @IsString()
    @ApiProperty()
    @IsNotEmpty({ message: 'Password is required' })
    @Length(1, 20, {
        message: 'Password length must be between 6 and 20 characters',
    })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        {
            message:
                'Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character',
        },
    )
    password: string

    @ApiHideProperty()
    roles: {
        create: Array<{
            role: {
                connect: {
                    id: number
                }
            }
        }>
    }
}
