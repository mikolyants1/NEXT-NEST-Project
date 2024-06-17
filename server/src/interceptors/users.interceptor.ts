import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, catchError, map, throwError } from "rxjs";
import { User } from "../entity/user.entity";
import { hidePassMap } from "../utils/hidePassMap";

@Injectable()
export class HidePassInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler<any>):Observable<any> {
    return next.handle().pipe(
      map(data => {
        if (Array.isArray(data)){
          const users = data as User[];
          return users.map((u:User) => (
            hidePassMap(u)
          ));
        } else {
          return hidePassMap(data as User);
        }
      }),
      catchError((err) => (
        throwError(() => new BadRequestException(err))
      ))
    );
  }
}