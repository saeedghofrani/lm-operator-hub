import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    @ApiProperty()
    name: string;

    @ApiProperty({ required: false, default: false })
    default?: boolean = false;
}
