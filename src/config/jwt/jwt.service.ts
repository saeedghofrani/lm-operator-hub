import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService {
    constructor(private configService: ConfigService) { }

    get secret(): string {
        return this.configService.get<string>('JWT_SECRET');
    }
    get exp_h(): string {
        return this.configService.get<string>('JWT_EXP_H');
    }
    get exp_d(): string {
        return this.configService.get<string>('JWT_EXP_D');
    }
}
