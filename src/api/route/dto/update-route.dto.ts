import { ApiProperty, PartialType } from '@nestjs/swagger'
import { RequestMethod } from '@prisma/client'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { CreateRouteDto } from './create-route.dto'

export class UpdateRouteDto extends PartialType(CreateRouteDto) {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    address: string

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(RequestMethod)
    method: RequestMethod

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string
}
