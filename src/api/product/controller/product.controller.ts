import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger'
import { PaginationQueryDto } from 'src/common/pagination/dto/query.dto'
import { CreateProductDto } from '../dto/create-product.dto'
import { UpdateProductDto } from '../dto/update-product.dto'
import { ProductEntity } from '../entities/product.entity'
import { ProductService } from '../service/product.service'
import { GetUser } from 'src/common/decorator/user.decorator'
import { UserInterface } from 'src/common/interfaces/user.interface'

@Controller('product')
@ApiTags('products')
@ApiBearerAuth('access-token')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    @ApiCreatedResponse({ type: ProductEntity })
    @ApiOperation({
        summary: 'create product',
        description: 'create product',
        operationId: 'createProduct',
    })
    create(
        @Body() createProductDto: CreateProductDto,
        @GetUser() userInterface: UserInterface,
    ) {
        return this.productService.create(createProductDto, userInterface)
    }

    @Get()
    @ApiOkResponse({ type: ProductEntity, isArray: true })
    @ApiOperation({
        summary: 'find all product',
        description: 'find all product',
        operationId: 'findAllProduct',
    })
    findAll() {
        return this.productService.findAll()
    }

    @Get('page')
    @ApiOperation({
        summary: 'product pagination',
        description: 'product pagination',
        operationId: 'paginationProduct',
    })
    pagination(@Query() paginationQueryDto: PaginationQueryDto) {
        return this.productService.pagination(paginationQueryDto)
    }

    @Get(':id')
    @ApiOperation({
        summary: 'find one product by id',
        description: 'find one product by id',
        operationId: 'findOneProduct',
    })
    @ApiOkResponse({ type: ProductEntity })
    findOne(@Param('id') id: string) {
        return this.productService.findOne(+id)
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'update product by id',
        description: 'update product by id',
        operationId: 'updateOneProduct',
    })
    @ApiOkResponse({ type: ProductEntity })
    update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return this.productService.update(+id, updateProductDto)
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'delete product by id',
        description: 'delete product by id',
        operationId: 'deleteOneProduct',
    })
    @ApiOkResponse({ type: ProductEntity })
    remove(@Param('id') id: string) {
        return this.productService.remove(+id)
    }
}
