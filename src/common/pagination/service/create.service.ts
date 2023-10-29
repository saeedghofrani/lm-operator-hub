import { Injectable } from "@nestjs/common";
import { PaginateFunction } from "../type/function.type";
import { PaginateOptions } from "../type/option.type";
import { json } from "stream/consumers";
import { PaginationQueryDto } from "../dto/query.dto";

@Injectable()
export class PaginationService {
    paginate: PaginateFunction;

    constructor() {
        this.paginate = this.createPaginator();
    }

    private createPaginator(defaultOptions?: PaginateOptions): PaginateFunction {
        return async (model, paginationQueryDto: PaginationQueryDto, options) => {
            const page = Number(options?.page || defaultOptions?.page) || 1;
            const perPage = Number(options?.perPage || defaultOptions?.perPage) || 10;
            const skip = page > 0 ? perPage * (page - 1) : 0;
            const [total, data] = await Promise.all([
                model.count({ where: paginationQueryDto.where }),
                model.findMany({
                    where:  paginationQueryDto.where || undefined,
                    orderBy:  paginationQueryDto.orderBy ||undefined,
                    take: perPage,
                    skip,
                }),
            ]);
            const lastPage = Math.ceil(total / perPage);
            return {
                data,
                meta: {
                    total,
                    lastPage,
                    currentPage: page,
                    perPage,
                    prev: page >= 1 ? page - 1 : null,
                    next: page < lastPage ? page + 1 : null,
                },
            };
        };
    }
}