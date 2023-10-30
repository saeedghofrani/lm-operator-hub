import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { RoleModule } from '../role/role.module';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';
import { OrderModule } from '../order/order.module';
import { ConfigurationModule } from 'src/config/configuration.module';

@Module({
  imports: [RoleModule, UserModule, ProductModule, OrderModule, ConfigurationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
