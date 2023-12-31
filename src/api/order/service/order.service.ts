import { Injectable } from '@nestjs/common';
import { Order, Product } from '@prisma/client';
import { BaseService } from 'src/common/abstract/service.abstract';
import { PaginationQueryDto } from 'src/common/pagination/dto/query.dto';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderRepository } from '../repository/order.repository';
import { ProductService } from 'src/api/product/service/product.service';

@Injectable()
export class OrderService extends BaseService<
  Order,
  CreateOrderDto,
  UpdateOrderDto
> {
  constructor(
    private orderRepository: OrderRepository,
    private productService: ProductService,
  ) {
    super(orderRepository);
  }

  async create(createOrderDto: CreateOrderDto) {
    try {
      const product = await this.productService.findOne(
        createOrderDto.productId,
      );
      const order = this.mapToOrder(createOrderDto, product);
      return this.orderRepository.createOrder(order);
    } catch (error) {
      throw error;
    }
  }

  private mapToOrder(
    createOrderDto: CreateOrderDto,
    product: Product,
  ): CreateOrderDto {
    const dueTime = this.calculateDueTime(product.durationTime);
    const order = {
      ...createOrderDto,
      assignedTo: { connect: { id: createOrderDto.userId } },
      product: { connect: { id: createOrderDto.productId } },
      orderTime: new Date(),
      orderNumber:
        `${product.name}` + `${product.id}` + `${new Date().getTime()}`,
      dueTime,
    };
    delete order.productId;
    delete order.userId;
    return order;
  }

  private calculateDueTime(durationTime: number): Date {
    const dueTime = new Date();
    dueTime.setDate(dueTime.getDate() + durationTime);
    return dueTime;
  }

  async findAll() {
    try {
      return this.orderRepository.findAllOrder();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return this.orderRepository.findOneOrder(id);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      return this.orderRepository.updateOrder(id, updateOrderDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return this.orderRepository.removeOrder(id);
    } catch (error) {
      throw error;
    }
  }

  async pagination(paginationQueryDto: PaginationQueryDto) {
    try {
      if (paginationQueryDto.where) {
        let whereCondition = {
          id: +paginationQueryDto.where.id || undefined,
          orderNumber: paginationQueryDto.where.orderNumber || undefined,
          assignedTo: {
            email: paginationQueryDto.where.email || undefined,
          },
          dueTime: {
            lte:
              new Date(paginationQueryDto.where.lte).toISOString() || undefined,
            gt:
              new Date(paginationQueryDto.where.gt).toISOString() || undefined,
          },
        };
        paginationQueryDto.where = whereCondition;
      }
      return this.orderRepository.pagination(paginationQueryDto);
    } catch (error) {
      throw error;
    }
  }
}
