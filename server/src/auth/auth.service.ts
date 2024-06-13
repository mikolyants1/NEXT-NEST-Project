import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserBodyDto, UserResDto } from "../dto/user.dto";
import { User } from "../entity/user.entity";
import { Repository } from "typeorm";
import * as bc from 'bcryptjs';
import { AuthAccessDto } from "../dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly users:Repository<User>,
    private readonly jwt:JwtService
  ){}

  async registAuthUser(username:string):Promise<UserResDto>{
    const user = await this.users.findOneBy({username});
    return {
      id:"",
      success:!Boolean(user),
      message:user ? "" : "username should be unique",
      tag:"",
      token:""
    }
  }

  async loginAuthUser({username,password}:UserBodyDto):Promise<UserResDto>{
    const user = await this.users.findOneBy({username});
    const user_password = user.password || "";
    const success = await bc.compare(password,user_password);
    const token = success ? this.jwt.sign({id:user.id}) : "";
    const right_user = user && success;
    return {
      id: right_user ? user.id : "",
      token,
      success,
      tag:right_user ? user.tag : "",
      message:success ? "" : "user not found"
    }
  }

  async updateAccess({check_name,check_pass,id}:AuthAccessDto):Promise<boolean>{
    const user:User = await this.users.findOneBy({id});
    const isName:boolean = user.username == check_name;
    const isPass:boolean = await bc.compare(check_pass,user.password);
    return isName && isPass;
  }
}