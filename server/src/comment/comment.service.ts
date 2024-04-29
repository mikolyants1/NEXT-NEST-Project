import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommBodyDto, UpdateCommDto } from "src/dto/comm.dto";
import { Comment } from "src/entity/comment.entity";
import { Task } from "src/entity/task.entity";
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class CommentService {
    constructor(
      @InjectRepository(Comment)
      private readonly comments:Repository<Comment>,
      @InjectRepository(Task)
      private readonly tasks:Repository<Task>
    ){}

    async getTaskComments(id:string):Promise<Comment[]>{
      const task:Task = await this.tasks.findOneBy({id});
      return this.comments.findBy({task});
    }

    async deleteTaskComment(commId:string):Promise<Comment>{
      const comment:DeleteResult = await this.comments.delete({id:commId});
      return comment.raw;
    }

    async createComment(id:string,userId:string,body:CommBodyDto):Promise<Comment>{
      const task:Task = await this.tasks.findOneBy({id});
      const newComment = this.comments.create({
        ...body,
        date:Date.now(),
        task,
        was_update:false,
        author_id:userId
      });
      return this.comments.save(newComment);
    }

    async updateComment(id:string,text:string):Promise<Comment>{
      const comment:Comment = await this.comments.findOneBy({id});
      const body:UpdateCommDto = comment.was_update ? {text} : {
        text,
        was_update:true
      };
      await this.comments.update({id},body);
      return this.comments.findOneBy({id});
    }
}