import { ApiProperty } from '@nestjs/swagger'

export class BaseEntity {
    @ApiProperty()
    id: number
}
