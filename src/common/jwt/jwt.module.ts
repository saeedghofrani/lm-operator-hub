import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigurationModule } from 'src/config/configuration.module';
import { JwtConfigService } from 'src/config/jwt/jwt.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigurationModule],
            inject: [JwtConfigService],
            useFactory: (config: JwtConfigService) => ({
                secret: config.secret,
            }),
        }),
    ],
    providers: [JwtStrategy],
    exports: [JwtStrategy],
})
export class JwtMainModule { }
