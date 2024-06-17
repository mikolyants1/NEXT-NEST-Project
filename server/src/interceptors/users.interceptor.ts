import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, catchError, map, throwError } from "rxjs";
import { User } from "../entity/user.entity";
import { hideFieldMap } from "src/utils/hideFieldsMap";

@Injectable()
export class HidePassInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler<any>):Observable<any> {
    return next.handle().pipe(
      map(data => {
        if (Array.isArray(data)){
          const users = data as User[];
          return users.map((u:User) => (
            hideFieldMap<User>(u,["password"])
          ));
        } else {
          const user = data as User;
          return hideFieldMap<User>(user,["password"]);
        }
      }),
      catchError((err) => (
        throwError(() => new BadRequestException(err))
      ))
    );
  }
}