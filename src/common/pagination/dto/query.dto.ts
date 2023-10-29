import { ApiProperty } from '@nestjs/swagger';

export class PaginationQueryDto {
    @ApiProperty({ example: 1,
        required: false })
    page?: number;

    @ApiProperty({ example: 10,
        required: false })
    perPage?: number;

    @ApiProperty({
        type: 'object',
        example: {
            id: 'desc'
        },
        required: false
    })
    orderBy?: Record<string, any>;

    @ApiProperty({
        type: 'object',
        example: {
            id: '4'
        },
        required: false
    })
    where?: Record<string, any>;
}
