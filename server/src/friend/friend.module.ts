import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { User } from "src/entity/user.entity";
import { FriendService } from "./friend.service";
import { FriendController } from "./friend.controller";
import { Friend } from "src/entity/friend.entity";
import { Invitation } from "src/entity/invite.entity";

@Module({
  imports:[
    AuthModule,
    TypeOrmModule.forFeature([User,Friend,Invitation])
  ],
  controllers:[FriendController],
  providers:[FriendService]
})
export class FriendModule {}