import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import {
    PrismaClientKnownRequestError,
    PrismaClientRustPanicError,
    PrismaClientValidationError,
    PrismaClientUnknownRequestError,
    PrismaClientInitializationError,
} from '@prisma/client/runtime/library'
import { Response } from 'express'

@Catch(
    HttpException,
    PrismaClientKnownRequestError,
    PrismaClientRustPanicError,
    PrismaClientValidationError,
    PrismaClientUnknownRequestError,
    PrismaClientInitializationError,
)
export class HttpExceptionFilter
    extends BaseExceptionFilter
    implements ExceptionFilter
{
    catch(
        exception:
            | HttpException
            | PrismaClientKnownRequestError
            | PrismaClientRustPanicError
            | PrismaClientValidationError
            | PrismaClientUnknownRequestError
            | PrismaClientInitializationError,
        host: ArgumentsHost,
    ) {
        // Extract the HTTP response object.
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()

        // Determine the HTTP status and error message.
        const status = this.getHttpStatus(exception)
        const message = this.getErrorMessage(exception)
        const date = Date.now()

        // Send the HTTP response.
        this.sendResponse(response, status, message, date)
    }

    // Determine the appropriate HTTP status based on the exception.
    private getHttpStatus(
        exception:
            | HttpException
            | PrismaClientKnownRequestError
            | PrismaClientRustPanicError
            | PrismaClientValidationError
            | PrismaClientUnknownRequestError
            | PrismaClientInitializationError,
    ): HttpStatus {
        // Handle different types of exceptions.
        if (exception instanceof HttpException) {
            return exception.getStatus()
        }
        if (
            exception instanceof PrismaClientKnownRequestError &&
            exception.code === 'P2002'
        ) {
            return HttpStatus.CONFLICT
        }
        if (
            exception instanceof PrismaClientRustPanicError ||
            exception instanceof PrismaClientValidationError ||
            exception instanceof PrismaClientKnownRequestError ||
            exception instanceof PrismaClientUnknownRequestError ||
            exception instanceof PrismaClientInitializationError
        ) {
            return HttpStatus.BAD_REQUEST
        }
        return HttpStatus.INTERNAL_SERVER_ERROR
    }

    // Determine the error message or details based on the exception.
    private getErrorMessage(
        exception:
            | HttpException
            | PrismaClientKnownRequestError
            | PrismaClientRustPanicError
            | PrismaClientValidationError
            | PrismaClientUnknownRequestError
            | PrismaClientInitializationError,
    ): any {
        // Handle different types of exceptions.
        if (
            exception instanceof PrismaClientRustPanicError ||
            exception instanceof PrismaClientValidationError ||
            exception instanceof PrismaClientKnownRequestError ||
            exception instanceof PrismaClientUnknownRequestError ||
            exception instanceof PrismaClientInitializationError
        ) {
            return {
                msg: exception.message.replace(/\n/g, ''),
                status: 'failed',
            }
        }
        return this.getErrorDetails(<HttpException>exception)
    }

    // Determine the error details based on the HTTP status.
    private getErrorDetails(exception: HttpException): any {
        const httpStatus = exception.getStatus()
        let errorMessage: any
        switch (httpStatus) {
            case HttpStatus.BAD_REQUEST:
                errorMessage = exception.getResponse()
                break
            case HttpStatus.UNPROCESSABLE_ENTITY:
                errorMessage = exception.getResponse()
            case HttpStatus.FORBIDDEN:
                errorMessage = exception.getResponse()
                break
            case HttpStatus.UNAUTHORIZED:
                errorMessage = exception.getResponse()
                break
            case HttpStatus.CONFLICT:
                errorMessage = exception.getResponse()
                break
            default:
                errorMessage =
                    'Sorry! Something went wrong on our end. Please try again later.'
        }

        return {
            errors:
                typeof errorMessage === 'string'
                    ? [errorMessage]
                    : errorMessage,
        }
    }

    // Send the HTTP response.
    private sendResponse(
        response: Response,
        status: HttpStatus,
        message: any,
        date: number,
    ) {
        response.status(status).json({ ...message, timestamp: date })
    }
}
