import { ApiProperty } from '@nestjs/swagger'
import { RequestMethod } from '@prisma/client'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { RouteEntity } from '../entities/route.entity'

export class CreateRouteDto implements Partial<RouteEntity> {
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
