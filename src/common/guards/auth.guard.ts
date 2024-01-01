import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { IS_PUBLIC_KEY } from '../constant/public.constant'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector, private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            // Check if the route is marked as public.
            const isPublic = this.reflector.getAllAndOverride<boolean>(
                IS_PUBLIC_KEY,
                [context.getHandler(), context.getClass()],
            )
            if (isPublic) {
                return true
            }

            const request = context.switchToHttp().getRequest()
            const token = this.extractTokenFromHeader(request)

            // Ensure a valid token exists.
            if (!token) {
                throw new UnauthorizedException('Missing or invalid token')
            }

            // Verify the token and attach the payload to the request.
            const payload = await this.jwtService.verifyAsync(token)
            request.user = payload
        } catch (error) {
            throw new UnauthorizedException('Unauthorized: ' + error.message)
        }

        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}
