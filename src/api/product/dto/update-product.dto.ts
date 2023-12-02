import { ApiHideProperty, ApiProperty, PartialType } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { CreateProductDto } from './create-product.dto'

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    durationTime: number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    userId: number

    @ApiHideProperty()
    assignee
}
