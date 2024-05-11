import { Body, Controller, Delete, Get, Headers, Param, Post, Put, UseGuards } from "@nestjs/common";
import { TaskService } from "./task.service";
import { Task } from "../entity/task.entity";
import { TaskBodyDto } from "../dto/task.dto";
import { AuthGuard } from "../guards/auth.guard";

@Controller("task")
export class TaskController {
    constructor(private readonly service:TaskService){}

    @Get(":id")
    async getTask(@Param("id") id:string):Promise<Task>{
      return this.service.getTask(id);
    }
    @Get("user/:id")
    async getUserTasks(@Param("id") id:string):Promise<Task[]>{
      return this.service.getUserTasks(id);
    }
    
    @UseGuards(AuthGuard)
    @Post()
    async createUserTask(
      @Headers("x-user") id:string,
      @Body() body:TaskBodyDto
    ):Promise<Task>{
      return this.service.createUserTasks(id,body.title);
    }

    @UseGuards(AuthGuard)
    @Delete(":id")
    async deleteTask(
      @Param("id") taskId:string,
      @Headers("x-user") userId:string
    ):Promise<number>{
      return this.service.deleteUserTasks(taskId,userId);
    }

    @UseGuards(AuthGuard)
    @Put(":id")
    async updateTask(
      @Param("id") id:string,
      @Body() body:TaskBodyDto
    ):Promise<Task>{
      return this.service.updateUserTasks(id,body);
    }
}