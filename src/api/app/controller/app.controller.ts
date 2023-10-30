import { Controller, Get } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { Public } from 'src/common/decorator/public-metadata.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
