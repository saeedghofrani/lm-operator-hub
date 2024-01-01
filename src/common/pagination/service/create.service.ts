import { Injectable } from '@nestjs/common'
import { PaginateFunction } from '../type/function.type'
import { PaginateOptions } from '../type/option.type'
import { PaginationQueryDto } from '../dto/query.dto'

@Injectable()
export class PaginationService {
    paginate: PaginateFunction

    constructor() {
        this.paginate = this.createPaginator()
    }

    /**
     * Create a paginator function with optional default options.
     * @param defaultOptions - Default pagination options.
     * @returns PaginateFunction for paginating data.
     */
    private createPaginator(
        defaultOptions?: PaginateOptions,
    ): PaginateFunction {
        return async (
            model,
            paginationQueryDto: PaginationQueryDto,
            options,
        ) => {
            try {
                const page = Number(options?.page || defaultOptions?.page) || 1
                const perPage =
                    Number(options?.perPage || defaultOptions?.perPage) || 10
                const skip = page > 0 ? perPage * (page - 1) : 0

                // Fetch total count and paginated data concurrently.
                const [total, data] = await Promise.all([
                    model.count({ where: paginationQueryDto.where }),
                    model.findMany({
                        where: paginationQueryDto.where || undefined,
                        orderBy: paginationQueryDto.orderBy || undefined,
                        take: perPage,
                        skip,
                    }),
                ])

                const lastPage = Math.ceil(total / perPage)

                // Create a pagination response.
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
                }
            } catch (error) {
                throw error
            }
        }
    }
}
