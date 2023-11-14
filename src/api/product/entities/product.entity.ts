import { ApiProperty } from '@nestjs/swagger'
import { Product } from 'prisma/prisma-client'
import { UserEntity } from 'src/api/user/entities/user.entity'
import { BaseEntity } from 'src/common/entities/base.entity'

export class ProductEntity extends BaseEntity implements Product {
    @ApiProperty() deleted: Date
    @ApiProperty() id: number
    @ApiProperty() durationTime: number
    @ApiProperty() name: string
    @ApiProperty() userId: number
    @ApiProperty() assignee: UserEntity
}
