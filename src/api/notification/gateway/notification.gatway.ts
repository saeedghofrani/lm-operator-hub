import { OnModuleInit, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import {
    OnGatewayDisconnect,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway(4200, {
    transports: 'websocket',
    cors: {
        origin: '*',
    },
})
export class NotificationGateway implements OnModuleInit, OnGatewayDisconnect {
    constructor(private jwtService: JwtService) {}
    @WebSocketServer()
    server: Server

    private connections: Map<number, Socket[]> = new Map<number, Socket[]>()

    afterInit(server: Server) {
        Logger.log(`Socket initialized`, 'WebSocket')
    }

    onModuleInit() {
        this.server.on('connection', async (socket: Socket) => {
            const token: string = <string>socket.handshake.headers.token
            const payload = await this.jwtService.verifyAsync(token)
            const existingConnections = this.connections.get(
                payload.user as number,
            )
            if (existingConnections) existingConnections.push(socket)
            else this.connections.set(payload.user as number, [socket])
            Logger.log(`Web socket connected ${socket.id}`, `Web Socket`)
        })
    }

    async handleDisconnect(socket: Socket) {
        const token: string = <string>socket.handshake.headers.token
        const payload = await this.jwtService.verifyAsync(token)
        const userSockets = this.connections.get(payload.user as number)
        if (userSockets) {
            const remainingSockets = userSockets.filter(
                (s) => s.id !== socket.id,
            )
            if (remainingSockets.length === 0) {
                this.connections.delete(payload.user as number)
            } else {
                this.connections.set(payload.user as number, remainingSockets)
            }
        }
        Logger.warn(`WebSocket disconnected ${socket.id}`, `WebSocket`)
    }

    async sendMessage(data: string, event: string, socketId: number) {
        console.log(socketId)
        console.log(this.connections)

        const socketConnection = this.connections.get(socketId) || []
        console.log(socketConnection)
        if (socketConnection.length > 0)
            socketConnection.forEach((socket) => {
                socket.emit(event, { msg: data })
            })
        Logger.log(`Web socket emit`, `Web Socket`)
    }
}
