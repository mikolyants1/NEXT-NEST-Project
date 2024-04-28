import { Module } from "@nestjs/common";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { Task } from "src/entity/task.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports:[
    AuthModule,
    TypeOrmModule.forFeature([User,Task])
  ],
  controllers:[TaskController],
  providers:[TaskService]
})
export class TaskModule {}