import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
    imports: [
        ThrottlerModule.forRoot({
            throttlers: [
                {
                    name: 'short',
                    ttl: 1000,
                    limit: 20,
                },
                {
                    name: 'medium',
                    ttl: 10000,
                    limit: 150,
                },
                {
                    name: 'long',
                    ttl: 60000,
                    limit: 300,
                },
            ],
        }),
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
    exports: [ThrottlerModule],
})
export class ThrottlerConfigModule { }