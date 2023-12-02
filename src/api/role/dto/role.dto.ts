import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class RoleDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    roleId: number
}
