import { Module } from "@nestjs/common";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "src/entity/task.entity";
import { Comment } from "src/entity/comment.entity";
import { AuthModule } from "src/auth/auth.module";
import { User } from "src/entity/user.entity";

@Module({
  imports:[
    AuthModule,
    TypeOrmModule.forFeature([Task,Comment,User])
  ],
  controllers:[CommentController],
  providers:[CommentService]
})
export class CommentModule {}