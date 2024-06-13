import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserBodyDto, UserResDto } from "../dto/user.dto";
import { Auth } from "../guards/apply.guard";
import { AuthAccessDto } from "../dto/auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly service:AuthService){}

  @Post("login")
  async checkUser(@Body() body:UserBodyDto):Promise<UserResDto>{
    if (body.isLogin){
      return this.service.loginAuthUser(body);
    } else {
      return this.service.registAuthUser(body.username);
    }
  }

  @Auth()
  @Post("access")
  async getAccess(@Body() body:AuthAccessDto):Promise<boolean>{
    return this.service.updateAccess(body);
  }
}