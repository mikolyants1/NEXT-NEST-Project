import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { TaskService } from "./task.service";
import { Task } from "src/entity/task.entity";
import { TaskBodyDto } from "src/dto/task.dto";
import { UpdateResult } from "typeorm";
import { AuthGuard } from "src/guards/auth.guard";

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
      @Query("userId") id:string,
      @Body() body:TaskBodyDto
    ):Promise<Task>{
      return this.service.createUserTasks(id,body.title);
    }

    @UseGuards(AuthGuard)
    @Delete(":id")
    async deleteTask(
      @Param("id") taskId:string,
      @Query("userId") userId:string
    ):Promise<Task>{
      return this.service.deleteUserTasks(taskId,userId);
    }

    @UseGuards(AuthGuard)
    @Put(":id")
    async updateTask(
      @Param("id") id:string,
      @Body() body:TaskBodyDto
    ):Promise<UpdateResult>{
      return this.service.updateUserTasks(id,body);
    }
}