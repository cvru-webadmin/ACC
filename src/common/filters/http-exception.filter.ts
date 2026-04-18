import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = 'Internal server error';
    let code: string | undefined;

    /**
     * 1️⃣ Prisma Known Errors
     */
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          status = HttpStatus.CONFLICT;
          message = 'Duplicate record';
          code = 'DUPLICATE_RECORD';
          break;

        case 'P2025':
          status = HttpStatus.NOT_FOUND;
          message = 'Record not found';
          code = 'RECORD_NOT_FOUND';
          break;

        default:
          status = HttpStatus.BAD_REQUEST;
          message = 'Database error';
          code = 'DATABASE_ERROR';
      }
    } else if (

    /**
     * 2️⃣ Nest HTTP Exceptions
     */
      exception instanceof HttpException &&
      exception.getStatus() === HttpStatus.BAD_REQUEST
    ) {
      const res = exception.getResponse() as any;

      if (Array.isArray(res.message)) {
        status = HttpStatus.BAD_REQUEST;
        message = res.message[0]; // first clean error
        code = 'VALIDATION_ERROR';
      }
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message = typeof res === 'string' ? res : (res as any).message || message;
      code = (res as any).code;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';

      this.logger.error(exception, 'Unknown / Unhandled exception occurred');
    }

    this.logger.error({
      message: exception instanceof Error ? exception.message : exception,
      stack: exception instanceof Error ? exception.stack : null,
      path: request.url,
      method: request.method,
      statusCode: status,
    });

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      code,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}