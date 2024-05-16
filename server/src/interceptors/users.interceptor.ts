/* eslint-disable @typescript-eslint/no-unused-vars */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, catchError, map, throwError } from "rxjs";
import { User } from "src/entity/user.entity";

@Injectable()
export class HidePassInterceptor implements NestInterceptor {
    intercept(ctx: ExecutionContext, next: CallHandler<any>):Observable<any> {
        return next.handle().pipe(
          map(data => {
            if (Array.isArray(data)){
              const users = data as User[];
              return users.map((u:User) => {
                const {password,...user} = u;
                return user;
              });
            } else {
              const user = data as User;
              const {password,...res} = user;
              return res;
            }
          }),
          catchError(err => throwError(err))
        );
    }
}