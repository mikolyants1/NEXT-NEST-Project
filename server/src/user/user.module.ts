import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";
import { AuthModule } from "../auth/auth.module";
import { Comment } from "../entity/comment.entity";

@Module({
  imports:[
    AuthModule,
    TypeOrmModule.forFeature([User,Comment])
  ],
  controllers:[UserController],
  providers:[UserService]
})
export class UserModule {}