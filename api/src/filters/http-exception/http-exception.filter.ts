// import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
// import { HttpAdapterHost } from '@nestjs/core';

// export interface HttpExceptionResponse {
//   statusCode: number;
//   message: string;
//   error: string;
// }

// @Catch()
// export class HttpExceptionFilter implements ExceptionFilter {
//   constructor(private readonly httpAdapterHost:HttpAdapterHost){}
//   catch(exception: unknown, host: ArgumentsHost) : void {
//     const { httpAdapter } = this.httpAdapterHost;
//     const ctx = host.switchToHttp() // tell we are working on http not web socket

//     const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
//     const response = exception instanceof HttpException ? exception.getResponse() : null;
//     const message = typeof response === "string" ? response : (response as HttpExceptionResponse).message ||  (response as HttpExceptionResponse).error || 'Internal server error';

//     const body = {
//       success: false,
//       statusCode: status,
//       timestamp: new Date().toISOString(),
//       path: httpAdapter.getRequestUrl(ctx.getRequest()),
//       message: (exception as any)?.message || 'Something went wrong',
//     };

//     httpAdapter.reply(ctx.getResponse(), body, status);
//   }
// }

// import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
// import { Request, Response } from 'express';

// @Catch()
// export class HttpExceptionFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp() // tell we are working on http not web socket
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();
//     const status = exception.getStatus();

//     response.status(status).json({
//       statusCode: status,
//       timestamp: new Date().toISOString(),
//       path: request.url,
//       message: exception.message
//     })
//   }
// }



import { ArgumentsHost, Catch } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
// import { ApolloError } from 'apollo-server-express';

@Catch()
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // You can return the same format as your HTTP filter
    return {
      statusCode: exception.getStatus?.() || 500,
      timestamp: new Date().toISOString(),
      message: exception.message,
    };
  }
}