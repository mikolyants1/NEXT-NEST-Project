import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { AuthUserDto } from "../dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(private readonly service:JwtService){}

  sign({id}:AuthUserDto):string{
    return this.service.sign({id});
  }

  verify(token:string,id:string):boolean{
    const decoded:AuthUserDto = this.service.verify(token);
    return decoded.id == id ;
  }

   getToken({headers}:Request):string{
    const auth:string = headers.authorization;
    return auth.includes('Bearer') ? auth.split(' ')[1] : "";
  }
}