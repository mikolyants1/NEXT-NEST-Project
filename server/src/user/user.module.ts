import { Logger, Module, OnModuleInit } from "@nestjs/common";
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
export class UserModule implements OnModuleInit {
  onModuleInit() {
    const logger = new Logger(UserModule.name);
    logger.log("module init");
  }
}