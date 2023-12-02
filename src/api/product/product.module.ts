import { Module } from '@nestjs/common'
import { PaginationService } from 'src/common/pagination/service/create.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { ProductController } from './controller/product.controller'
import { ProductRepository } from './repository/product.repository'
import { ProductService } from './service/product.service'

@Module({
    imports: [PrismaModule],
    controllers: [ProductController],
    providers: [ProductService, ProductRepository, PaginationService],
    exports: [ProductService],
})
export class ProductModule {}
