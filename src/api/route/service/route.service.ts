import { Injectable } from '@nestjs/common';
import { Route } from '@prisma/client';
import { BaseService } from 'src/common/abstract/service.abstract';
import { PaginationQueryDto } from 'src/common/pagination/dto/query.dto';
import { CreateRouteDto } from '../dto/create-route.dto';
import { UpdateRouteDto } from '../dto/update-route.dto';
import { RouteRepository } from '../repository/route.repository';

@Injectable()
export class RouteService extends BaseService<
  Route,
  CreateRouteDto,
  UpdateRouteDto
> {
  constructor(private routeRepository: RouteRepository) {
    super(routeRepository);
  }

  async create(createRouteDto: CreateRouteDto) {
    try {
      return this.routeRepository.createRoute(createRouteDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return this.routeRepository.findAllRoute();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return this.routeRepository.findOneRoute(id);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateRouteDto: UpdateRouteDto) {
    try {
      return this.routeRepository.updateRoute(id, updateRouteDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return this.routeRepository.removeRoute(id);
    } catch (error) {
      throw error;
    }
  }

  async pagination(paginationQueryDto: PaginationQueryDto) {
    try {
      if (paginationQueryDto.where) {
        let whereCondition = {
          id: +paginationQueryDto.where.id || undefined,
        };
        paginationQueryDto.where = whereCondition;
      }
      return this.routeRepository.pagination(paginationQueryDto);
    } catch (error) {
      throw error;
    }
  }
}
