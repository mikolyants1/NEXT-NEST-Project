import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    try {
      const req:Request = ctx.switchToHttp().getRequest();
      const user = req.user as {id:string};
      const id = req.headers["x-user"] as string;
      return user.id == id;
    } catch (e) {
      if (e instanceof Error){
        throw new UnauthorizedException(e.message);
      }
    }
  }
}