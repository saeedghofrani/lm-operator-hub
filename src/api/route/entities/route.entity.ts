import { ApiProperty } from '@nestjs/swagger'
import { $Enums, Route } from 'prisma/prisma-client'
import { BaseEntity } from 'src/common/entities/base.entity'

export class RouteEntity extends BaseEntity implements Route {
    @ApiProperty() deleted: Date
    @ApiProperty() address: string
    @ApiProperty() method: $Enums.RequestMethod
    @ApiProperty() description: string
    @ApiProperty() id: number
}
