import { Logger, Module, OnModuleInit } from "@nestjs/common";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "../entity/task.entity";
import { Comment } from "../entity/comment.entity";
import { AuthModule } from "../auth/auth.module";
import { User } from "../entity/user.entity";

@Module({
  imports:[
    AuthModule,
    TypeOrmModule.forFeature([Task,Comment,User])
  ],
  controllers:[CommentController],
  providers:[CommentService]
})
export class CommentModule implements OnModuleInit {
  onModuleInit() {
    const logger = new Logger(CommentModule.name);
    logger.log("module init");
  }
}