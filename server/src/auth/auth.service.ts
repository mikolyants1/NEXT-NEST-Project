import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { AuthUserDto } from "src/dto/auth.dto";
import { User } from "src/entity/user.entity";

@Injectable()
export class AuthService {
  constructor(private readonly service:JwtService){}

  sign({id,username}:AuthUserDto):string{
    return this.service.sign({id,username});
  }

  verify(token:string,{username,id}:User):boolean{
    const decoded:AuthUserDto = this.service.verify(token);
    return decoded.id == id && decoded.username == username;
  }

   getToken({headers}:Request):string{
    const auth:string = headers.authorization;
    return auth.includes('Bearer') ? auth.split(' ')[1] : "";
  }
}