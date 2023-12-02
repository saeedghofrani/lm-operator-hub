import { Module } from '@nestjs/common'
import { NotificationGateway } from './gateway/notification.gatway'

@Module({
    imports: [],
    exports: [NotificationGateway],
    providers: [NotificationGateway],
})
export class NotificationModule {}
