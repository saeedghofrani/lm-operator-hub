import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator'

export class LoginDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'Email number is required' })
    @IsEmail()
    email: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    // @Length(1, 20, {
    //     message: 'Password length must be between 6 and 20 characters',
    // })
    // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    //     message: 'Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character',
    // })
    password: string
}
