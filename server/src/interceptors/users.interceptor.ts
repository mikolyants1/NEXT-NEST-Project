import { BadRequestException, CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, catchError, map, throwError } from "rxjs";
import { User } from "../entity/user.entity";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { Response } from "express";

@Injectable()
export class HidePassInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler<any>):Observable<any> {
    const http:HttpArgumentsHost = ctx.switchToHttp();
    const res:Response = http.getResponse();

    return next.handle().pipe(
      map(data => {
        if (Array.isArray(data)){
          const users = data as User[];
          const hide_array = users.map((u:User) => {
            const {password,...user} = u;
            return user;
          });
          return res.status(HttpStatus.OK).json(hide_array);
        } else {
          const {password,...user} = data as User;
          return res.status(HttpStatus.OK).json(user);
        }
      }),
      catchError((err) => (
        throwError(() => new BadRequestException(err))
      ))
    );
  }
}