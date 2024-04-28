import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { Comment } from "src/entity/comment.entity";
import { CommBodyDto } from "src/dto/comm.dto";
import { UpdateResult } from "typeorm";
import { AuthGuard } from "src/guards/auth.guard";

@Controller("comments")
export class CommentController {
    constructor(private readonly service:CommentService){}

    @Get(":id")
    async getTaskComments(@Param("id") id:string):Promise<Comment[]>{
      return this.service.getTaskComments(id);
    }

    @UseGuards(AuthGuard)
    @Post(":id")
    async createComment(
      @Query("userId") userId:string,
      @Param("id") id:string,
      @Body() body:CommBodyDto
    ):Promise<Comment>{
      return this.service.createComment(id,userId,body);
    }

    @UseGuards(AuthGuard)
    @Delete(":id")
    async deleteComment(@Param("id") commId:string):Promise<Comment>{
      return this.service.deleteTaskComment(commId);
    }

    @UseGuards(AuthGuard)
    @Put(":id")
    async updateComment(
      @Param("id") id:string,
      @Body() body:Omit<CommBodyDto,"author">
    ):Promise<UpdateResult>{
      return this.service.updateComment(id,body.text);
    }

}