import { Test, TestingModule } from '@nestjs/testing'
import { RouteController } from './route.controller'
import { RouteService } from '../service/route.service'

describe('RouteController', () => {
    let controller: RouteController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RouteController],
            providers: [RouteService],
        }).compile()

        controller = module.get<RouteController>(RouteController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
