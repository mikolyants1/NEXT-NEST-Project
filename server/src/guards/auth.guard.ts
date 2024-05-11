import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
   constructor(private readonly jwt:AuthService){}

   async canActivate(ctx: ExecutionContext): Promise<boolean> {
     try {
        const req:Request = ctx.switchToHttp().getRequest();
        const token:string = this.jwt.getToken(req);
        const id = req.headers["x-user"] as string;
        if (!token) throw new UnauthorizedException('Bearer not found');
        return this.jwt.verify(token,id);
     } catch (e) {
        if (e instanceof Error){
          throw new UnauthorizedException(e.message);
        }
      }
    }
}