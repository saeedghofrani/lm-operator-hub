import { ApiHideProperty, ApiProperty, PartialType } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'
import { CreateOrderDto } from './create-order.dto'

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @ApiHideProperty() orderNumber: string
    @ApiHideProperty() orderTime: Date
    @ApiHideProperty() dueTime: Date

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    productId: number

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    userId: number

    @ApiHideProperty() assignee: number
}
