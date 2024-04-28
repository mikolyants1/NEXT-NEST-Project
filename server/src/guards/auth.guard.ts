import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { AuthService } from "src/auth/auth.service";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthGuard implements CanActivate {
   constructor(
    @InjectRepository(User)
    private readonly users:Repository<User>,
    private readonly jwt:AuthService
   ){}

   async canActivate(ctx: ExecutionContext): Promise<boolean> {
     try {
        const req:Request = ctx.switchToHttp().getRequest();
        const token:string = this.jwt.getToken(req);
        const id = req.query.userId as string;
        const user:User = await this.users.findOneBy({id});
        if (!token) throw new UnauthorizedException('Bearer not found');
        console.log( this.jwt.verify(token,user))
        return this.jwt.verify(token,user);
     } catch (e) {
        if (e instanceof Error){
          throw new UnauthorizedException(e.message);
        }
      }
    }
}