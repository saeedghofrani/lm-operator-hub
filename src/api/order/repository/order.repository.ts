import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { BaseRepository } from 'src/common/abstract/repository.abstract';
import { PaginatedResult } from 'src/common/pagination/interface/result.interface';
import { PaginationService } from 'src/common/pagination/service/create.service';
import { PaginationQueryDto } from 'src/common/pagination/dto/query.dto';
import { Order } from '@prisma/client';

@Injectable()
export class OrderRepository extends BaseRepository<
  Order,
  CreateOrderDto,
  UpdateOrderDto
> {
  constructor(
    protected prisma: PrismaService,
    private paginationService: PaginationService,
  ) {
    super(prisma);
  }

  get modelName(): string {
    return 'order';
  }

  createOrder(createOrderDto: CreateOrderDto) {
    return this.create(createOrderDto);
  }

  findAllOrder() {
    return this.findAll();
  }

  findOneOrder(id: number) {
    return this.findOne(id);
  }

  updateOrder(id: number, updateOrderDto: UpdateOrderDto) {
    return this.update(id, updateOrderDto);
  }

  removeOrder(id: number) {
    return this.remove(id);
  }

  pagination(
    paginationQueryDto: PaginationQueryDto,
  ): Promise<PaginatedResult<Order>> {
    return this.paginationService.paginate(
      this.prisma.order,
      paginationQueryDto,
    );
  }
}
