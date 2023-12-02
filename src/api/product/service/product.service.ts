import { Injectable } from '@nestjs/common'
import { Product } from '@prisma/client'
import { BaseService } from 'src/common/abstract/service.abstract'
import { PaginationQueryDto } from 'src/common/pagination/dto/query.dto'
import { CreateProductDto } from '../dto/create-product.dto'
import { UpdateProductDto } from '../dto/update-product.dto'
import { ProductRepository } from '../repository/product.repository'
import { UserInterface } from 'src/common/interfaces/user.interface'

@Injectable()
export class ProductService extends BaseService<
    Product,
    CreateProductDto,
    UpdateProductDto
> {
    constructor(private productRepository: ProductRepository) {
        super(productRepository)
    }

    async create(
        createProductDto: CreateProductDto,
        userInterface?: UserInterface
    ) {
        try {
            createProductDto.assignee = {
                connect: {
                    id: createProductDto.userId || userInterface.user,
                },
            }
            delete createProductDto.userId
            return this.productRepository.createProduct(createProductDto)
        } catch (error) {
            throw error
        }
    }

    async findAll() {
        try {
            return this.productRepository.findAllProduct()
        } catch (error) {
            throw error
        }
    }

    async findOne(id: number) {
        try {
            return this.productRepository.findOneProduct(id)
        } catch (error) {
            throw error
        }
    }

    async update(id: number, updateProductDto: UpdateProductDto) {
        try {
            updateProductDto.assignee = {
                connect: {
                    id: updateProductDto.userId,
                },
            }
            delete updateProductDto.userId
            return this.productRepository.updateProduct(id, updateProductDto)
        } catch (error) {
            throw error
        }
    }

    async remove(id: number) {
        try {
            return this.productRepository.removeProduct(id)
        } catch (error) {
            throw error
        }
    }

    async pagination(paginationQueryDto: PaginationQueryDto) {
        try {
            if (paginationQueryDto.where) {
                let whereCondition = {
                    id: +paginationQueryDto.where.id || undefined,
                    name: paginationQueryDto.where.name,
                    assignee: {
                        id: +paginationQueryDto.where.assignee,
                    },
                }
                paginationQueryDto.where = whereCondition
            }
            return this.productRepository.pagination(paginationQueryDto)
        } catch (error) {
            throw error
        }
    }
}
