import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { AuthModule } from "src/auth/auth.module";
import { Comment } from "src/entity/comment.entity";

@Module({
  imports:[
    AuthModule,
    TypeOrmModule.forFeature([User,Comment])
  ],
  controllers:[UserController],
  providers:[UserService]
})
export class UserModule {}