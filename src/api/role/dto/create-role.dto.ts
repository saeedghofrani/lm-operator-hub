// src/articles/dto/create-article.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty()
    name: string;

    @ApiProperty({ required: false, default: false })
    default?: boolean = false;
}