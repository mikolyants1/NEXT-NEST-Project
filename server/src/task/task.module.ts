import { Logger, Module, OnModuleInit } from "@nestjs/common";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";
import { Task } from "../entity/task.entity";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports:[
    AuthModule,
    TypeOrmModule.forFeature([User,Task])
  ],
  controllers:[TaskController],
  providers:[TaskService]
})
export class TaskModule implements OnModuleInit {
  onModuleInit() {
    const logger = new Logger(TaskModule.name);
    logger.log("module init");
  }
}