import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
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
}
