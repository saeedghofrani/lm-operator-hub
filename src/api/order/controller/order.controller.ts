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
import { CreateOrderDto } from '../dto/create-order.dto'
import { UpdateOrderDto } from '../dto/update-order.dto'
import { OrderEntity } from '../entities/order.entity'
import { OrderService } from '../service/order.service'
import { GetUser } from 'src/common/decorator/user.decorator'
import { UserInterface } from 'src/common/interfaces/user.interface'

@Controller('order')
@ApiTags('orders')
@ApiBearerAuth('access-token')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    @ApiCreatedResponse({ type: OrderEntity })
    @ApiOperation({
        summary: 'create order',
        description: 'create order',
        operationId: 'createOrder',
    })
    create(
        @Body() createOrderDto: CreateOrderDto,
        @GetUser() userInterface: UserInterface
    ) {
        return this.orderService.create(createOrderDto, userInterface)
    }

    @Get()
    @ApiOkResponse({ type: OrderEntity, isArray: true })
    @ApiOperation({
        summary: 'find all order',
        description: 'find all order',
        operationId: 'findAllOrder',
    })
    findAll(@GetUser() userInterface: UserInterface) {
        return this.orderService.findAll(userInterface)
    }

    @Get('page')
    @ApiOperation({
        summary: 'order pagination',
        description: 'order pagination',
        operationId: 'paginationOrder',
    })
    pagination(@Query() paginationQueryDto: PaginationQueryDto) {
        return this.orderService.pagination(paginationQueryDto)
    }

    @Get(':id')
    @ApiOperation({
        summary: 'find one order by id',
        description: 'find one order by id',
        operationId: 'findOneOrder',
    })
    @ApiOkResponse({ type: OrderEntity })
    findOne(@Param('id') id: string) {
        return this.orderService.findOne(+id)
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'update order by id',
        description: 'update order by id',
        operationId: 'updateOneOrder',
    })
    @ApiOkResponse({ type: OrderEntity })
    update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return this.orderService.update(+id, updateOrderDto)
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'delete order by id',
        description: 'delete order by id',
        operationId: 'deleteOneOrder',
    })
    @ApiOkResponse({ type: OrderEntity })
    remove(@Param('id') id: string) {
        return this.orderService.remove(+id)
    }
}
