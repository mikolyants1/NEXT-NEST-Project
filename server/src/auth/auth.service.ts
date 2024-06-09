import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateAccessDto, UserBodyDto, UserResDto } from "../dto/user.dto";
import { User } from "../entity/user.entity";
import { Repository } from "typeorm";
import * as bc from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly users:Repository<User>,
    private readonly jwt:JwtService
  ){}

  async registAuthUser(username:string):Promise<UserResDto>{
    const user = await this.users.findOneBy({username});
    const success = !Boolean(user);
    return {
      id:"",
      success,
      message:success ? "" : "username should be unique",
      tag:"",
      token:""
    }
  }

  async loginAuthUser({
    username,
    password
  }:Omit<UserBodyDto,"isLogin">):Promise<UserResDto>{
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

  async updateAccess({
    check_name,
    check_pass,
    id
  }:UpdateAccessDto):Promise<boolean>{
    const {username,password}:User = await this.users.findOneBy({id});
    const correctName:boolean = username == check_name;
    const correctPass:boolean = bc.compareSync(check_pass,password);
    return correctName && correctPass;
  }
}