import { Module } from '@nestjs/common';
import { ConfigurationModule } from 'src/config/configuration.module';
import { ThrottlerConfigModule } from 'src/common/throttler/throtther.module';
import { OrderModule } from '../order/order.module';
import { ProductModule } from '../product/product.module';
import { RoleModule } from '../role/role.module';
import { UserModule } from '../user/user.module';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from 'src/config/jwt/jwt.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RouteModule } from '../route/route.module';
import { PermissionModule } from '../permission/permission.module';
import { PermissionGuard } from 'src/common/guards/permission.guard';
import { PermissionCache } from 'src/common/cache/permission-cache.service';

@Module({
  imports: [
    RoleModule,
    UserModule,
    ProductModule,
    OrderModule,
    PermissionModule,
    RouteModule,
    ConfigurationModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [JwtConfigService],
      useFactory: (config: JwtConfigService) => ({
        secret: config.secret,
        signOptions: {
          expiresIn: config.expirationDays,
        },
      }),
      global: true,
    }),
    ThrottlerConfigModule,
  ],
  controllers: [AppController],
  providers: [
    PermissionCache,
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {}
