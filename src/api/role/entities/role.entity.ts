import { ApiProperty } from '@nestjs/swagger'
import { Role } from 'prisma/prisma-client'
import { BaseEntity } from 'src/common/entities/base.entity'

export class RoleEntity extends BaseEntity implements Role {
    @ApiProperty() id: number
    @ApiProperty({ required: false, default: false }) deleted: Date
    @ApiProperty() name: string
    @ApiProperty({ required: false, default: false }) default: boolean
}
