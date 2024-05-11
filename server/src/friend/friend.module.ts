import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { User } from "../entity/user.entity";
import { FriendService } from "./friend.service";
import { FriendController } from "./friend.controller";
import { Friend } from "../entity/friend.entity";
import { Invitation } from "../entity/invite.entity";

@Module({
  imports:[
    AuthModule,
    TypeOrmModule.forFeature([User,Friend,Invitation])
  ],
  controllers:[FriendController],
  providers:[FriendService]
})
export class FriendModule {}