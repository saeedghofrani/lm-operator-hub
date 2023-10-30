import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientValidationError, PrismaClientUnknownRequestError, PrismaClientInitializationError } from '@prisma/client/runtime/library';
import { Response } from 'express';

@Catch(HttpException, PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientValidationError, PrismaClientUnknownRequestError, PrismaClientInitializationError)
export class HttpExceptionFilter extends BaseExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | PrismaClientKnownRequestError | PrismaClientRustPanicError | PrismaClientValidationError | PrismaClientUnknownRequestError | PrismaClientInitializationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = this.getHttpStatus(exception);
    const message = this.getErrorMessage(exception);
    const date = Date.now();
    this.sendResponse(response, status, message, date);
  }

  private getHttpStatus(exception: HttpException | PrismaClientKnownRequestError | PrismaClientRustPanicError | PrismaClientValidationError | PrismaClientUnknownRequestError | PrismaClientInitializationError): HttpStatus {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }
    if (exception instanceof PrismaClientKnownRequestError && exception.code === 'P2002') {
      return HttpStatus.CONFLICT;
    }
    if (exception instanceof PrismaClientRustPanicError || exception instanceof PrismaClientValidationError || exception instanceof PrismaClientKnownRequestError || exception instanceof PrismaClientUnknownRequestError || exception instanceof PrismaClientInitializationError) {
      return HttpStatus.BAD_REQUEST;
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getErrorMessage(exception: HttpException | PrismaClientKnownRequestError | PrismaClientRustPanicError | PrismaClientValidationError | PrismaClientUnknownRequestError | PrismaClientInitializationError): any {
    if (exception instanceof PrismaClientKnownRequestError || PrismaClientKnownRequestError || PrismaClientRustPanicError || PrismaClientValidationError || PrismaClientUnknownRequestError || PrismaClientInitializationError) {
      return {
        msg: exception.message.replace(/\n/g, ''),
        status: 'failed',
      };
    }
    return this.getErrorDetails(<HttpException>(exception));
  }

  private getErrorDetails(exception: HttpException): any {
    const httpStatus = exception.getStatus();
    let errorMessage: any;

    switch (httpStatus) {
      case HttpStatus.BAD_REQUEST:
        errorMessage = exception.getResponse();
        break;
      case HttpStatus.UNPROCESSABLE_ENTITY:
        errorMessage = exception.getResponse();
        break;
      default:
        errorMessage = 'Sorry! Something went wrong on our end. Please try again later.';
    }

    return {
      errors: typeof errorMessage === 'string' ? [errorMessage] : errorMessage,
    };
  }

  private sendResponse(response: Response, status: HttpStatus, message: any, date: number) {
    response.status(status).json({ ...message, timestamp: date });
  }
}