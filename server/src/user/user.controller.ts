import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "../entity/user.entity";
import { AuthGuard } from "../guards/auth.guard";
import { UpdateAccessDto,UserBodyDto, UserCreateDto, UserResDto } from "../dto/user.dto";
import { HidePassInterceptor } from "src/interceptors/users.interceptor";

@Controller("user")
export class UserController {
  constructor(private readonly service:UserService){}

  @Get()
  @UseInterceptors(HidePassInterceptor)
  async getUsers():Promise<User[]>{
    return this.service.getUsers();
  }

  @Get("get_one/:id")
  @UseInterceptors(HidePassInterceptor)
  async getUser(@Param("id") id:string):Promise<User>{
    return this.service.getUser(id);
  }

  @Post()
  @UseInterceptors(HidePassInterceptor)
  async createUser(@Body() body:UserCreateDto):Promise<User>{
    return this.service.createUser(body);
  }

  @Post("check")
  async checkUser(@Body() body:UserBodyDto):Promise<UserResDto>{
    return this.service.checkUser(body);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  async deleteUser(@Param("id") id:string):Promise<number>{
    return this.service.deleteUser(id);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(HidePassInterceptor)
  @Put(":id")
  async updateUser(
    @Param("id") id:string,
    @Body() body:UserCreateDto
  ):Promise<User>{
    return this.service.updateUser(id,body);
  }

  @Post("access/:id")
  async updateAccess(
    @Param("id") id:string,
    @Body() body:UpdateAccessDto
  ):Promise<boolean>{
    return this.service.updateAccess(id,body);
  }

  @Get("tags")
  async getTags():Promise<string[]>{
    return this.service.getUserTags();
  }
}