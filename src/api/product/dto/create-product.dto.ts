import {
    ApiHideProperty,
    ApiProperty,
    ApiPropertyOptional,
} from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ProductEntity } from '../entities/product.entity'
import { number } from 'joi'

export class CreateProductDto implements Partial<ProductEntity> {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    durationTime: number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @ApiPropertyOptional()
    userId?: number

    @ApiHideProperty()
    assignee
}
