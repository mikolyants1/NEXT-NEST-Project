import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "../entity/user.entity";
import { UserCreateDto } from "../dto/user.dto";
import { HidePassInterceptor } from "../interceptors/users.interceptor";
import { Auth } from "../guards/apply.guard";

@Controller("user")
export class UserController {
  constructor(private readonly service:UserService){}

  @Get()
  @UseInterceptors(HidePassInterceptor)
  async getUsers():Promise<User[]>{
    return this.service.getUsers();
  }
  
  @Get("tags")
  async getTags():Promise<string[]>{
    return this.service.getUserTags();
  }
  @Get(":id")
  @UseInterceptors(HidePassInterceptor)
  async getUser(@Param("id") id:string):Promise<User>{
    return this.service.getUser(id);
  }

  @Post()
  @UseInterceptors(HidePassInterceptor)
  async createUser(@Body() body:UserCreateDto):Promise<User>{
    return this.service.createUser(body);
  }

  @Auth()
  @Delete(":id")
  async deleteUser(@Param("id") id:string):Promise<number>{
    return this.service.deleteUser(id);
  }

  @Auth()
  @UseInterceptors(HidePassInterceptor)
  @Put(":id")
  async updateUser(
    @Param("id") id:string,
    @Body() body:UserCreateDto
  ):Promise<User>{
    return this.service.updateUser(id,body);
  }
}