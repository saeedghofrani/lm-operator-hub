import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductEntity } from '../entities/product.entity';

export class CreateProductDto implements Partial<ProductEntity> {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  durationTime: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiHideProperty()
  assignee;
}
