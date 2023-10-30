import { Module } from '@nestjs/common';
import { ConfigurationModule } from 'src/config/configuration.module';
import { ThrottlerConfigModule } from 'src/config/throttler/throtther.module';
import { OrderModule } from '../order/order.module';
import { ProductModule } from '../product/product.module';
import { RoleModule } from '../role/role.module';
import { UserModule } from '../user/user.module';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';

@Module({
  imports: [
    RoleModule,
    UserModule,
    ProductModule,
    OrderModule,
    ConfigurationModule,
    ThrottlerConfigModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
