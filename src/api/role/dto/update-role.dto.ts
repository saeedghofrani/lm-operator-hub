import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateRoleDto } from './create-role.dto'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({ required: false, default: false })
    @IsBoolean()
    default?: boolean = false
}
