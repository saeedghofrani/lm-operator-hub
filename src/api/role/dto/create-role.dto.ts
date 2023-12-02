import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'
import { RoleEntity } from '../entities/role.entity'

export class CreateRoleDto implements Partial<RoleEntity> {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({ required: false, default: false })
    @IsBoolean()
    default?: boolean = false
}
