import { ApiProperty } from '@nestjs/swagger'
import { Role, User } from 'prisma/prisma-client'
import { BaseEntity } from 'src/common/entities/base.entity'

export class UserEntity extends BaseEntity implements User {
    @ApiProperty() id: number
    @ApiProperty({ required: false, default: false }) deleted: Date
    @ApiProperty() email: string
    @ApiProperty() username: string
    @ApiProperty() password: string
}
