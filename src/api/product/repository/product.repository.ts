import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/service/prisma.service'
import { CreateProductDto } from '../dto/create-product.dto'
import { UpdateProductDto } from '../dto/update-product.dto'
import { BaseRepository } from 'src/common/abstract/repository.abstract'
import { PaginatedResult } from 'src/common/pagination/interface/result.interface'
import { PaginationService } from 'src/common/pagination/service/create.service'
import { PaginationQueryDto } from 'src/common/pagination/dto/query.dto'
import { Product } from '@prisma/client'

@Injectable()
export class ProductRepository extends BaseRepository<
    Product,
    CreateProductDto,
    UpdateProductDto
> {
    constructor(
        protected prisma: PrismaService,
        private paginationService: PaginationService,
    ) {
        super(prisma)
    }

    get modelName(): string {
        return 'product'
    }

    createProduct(createProductDto: CreateProductDto) {
        return this.create(createProductDto)
    }

    findAllProduct() {
        return this.findAll()
    }

    findOneProduct(id: number) {
        return this.findOne(id)
    }

    updateProduct(id: number, updateProductDto: UpdateProductDto) {
        return this.update(id, updateProductDto)
    }

    removeProduct(id: number) {
        return this.remove(id)
    }

    pagination(
        paginationQueryDto: PaginationQueryDto,
    ): Promise<PaginatedResult<Product>> {
        return this.paginationService.paginate(
            this.prisma.getClient().product,
            paginationQueryDto,
        )
    }
}
