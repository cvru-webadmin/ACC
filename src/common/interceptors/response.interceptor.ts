import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: any;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        // If data is already in the expected format (e.g. from a paginated service), just return it
        // Or wrap it consistently.
        // Let's assume pagination returns { data: [...], meta: {...} }
        if (data && typeof data === 'object' && 'data' in data && 'meta' in data) {
          return {
            success: true,
            message: 'Operation successful',
            data: data.data,
            meta: data.meta,
          };
        }

        return {
          success: true,
          message: 'Operation successful',
          data: data,
        };
      }),
    );
  }
}
