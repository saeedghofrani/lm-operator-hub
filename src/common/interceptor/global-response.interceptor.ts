import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { Request, Response } from 'express'
import { GlobalResponseDto } from '../dto/global-response.dto'

export class ResponseOkInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<GlobalResponseDto> | Promise<Observable<GlobalResponseDto>> {
        const req: Request = context.switchToHttp().getRequest()
        const res: Response = context.switchToHttp().getResponse()
        let statusCode: number = res.statusCode
        let status: string
        statusCode < 400 ? (status = 'success') : (status = 'failed')
        return next
            .handle()
            .pipe(
                map((data) => new GlobalResponseDto(status, statusCode, data)),
            )
    }
}
