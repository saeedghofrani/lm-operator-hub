import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';

@Catch(HttpException, PrismaClientKnownRequestError) // Catch Prisma-specific error
export class HttpExceptionFilter implements ExceptionFilter {
    constructor() { }

    async catch(exception: HttpException | PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        // Determine the HTTP status code
        const status =
            exception instanceof HttpException ? exception.getStatus() : 500;

        const date = Date.now();

        // Define error messages and responses based on status code
        const errorResponse: any = {
            400: {
                msg: 'Bad Request',
                status: 'failed',
            },
            401: { msg: 'Unauthorized', status: 'failed' },
            403: {
                msg: 'Forbidden',
                status: 'failed',
            },
            404: {
                msg: 'Not Found',
                status: 'failed',
            },
            500: { msg: 'Internal Server Error', status: 'failed' },
        };

        let errorMessage = errorResponse[status] || errorResponse[500]; // Default to Internal Server Error

        // Handle Prisma-specific errors
        if (exception instanceof PrismaClientKnownRequestError) {
            errorMessage = {
                msg: exception.message,
                status: 'failed',
            };
        }

        // Send the appropriate response based on the status code
        response.status(status).json({
            ...errorMessage,
            timestamp: date,
        });
    }
}