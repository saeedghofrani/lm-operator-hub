import { ApiProperty } from "@nestjs/swagger";
import { Role } from 'prisma/prisma-client'

export class RoleEntity implements Role {
    @ApiProperty() id: number;
    @ApiProperty() name: string;
    @ApiProperty({ required: false, nullable: true }) default: boolean;
}
