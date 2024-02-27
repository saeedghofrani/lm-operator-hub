import { ApiProperty } from '@nestjs/swagger'
import { $Enums, Permission } from 'prisma/prisma-client'
import { BaseEntity } from 'src/common/entities/base.entity'

export class PermissionEntity extends BaseEntity implements Permission {
    @ApiProperty() name: string
    s?: string
    @ApiProperty() read: $Enums.ReadAccess
    @ApiProperty() deleted: Date
    @ApiProperty() id: number
}
