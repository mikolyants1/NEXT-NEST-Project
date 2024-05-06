import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { FriendService } from "./friend.service";
import { AuthGuard } from "src/guards/auth.guard";
import { Friend } from "src/entity/friend.entity";
import { FriendBodyDto } from "src/dto/friend.dto";
import { EFriendAction } from "src/enums/friend.enum";

@Controller("friend")
export class FriendController {
    constructor(private readonly service:FriendService){}

    @Get(":id")
    async getUserfriends(@Param("id") id:string):Promise<Friend[]>{
      return this.service.getUserFriends(id);
    }

    @UseGuards(AuthGuard)
    @Post()
    async actionWithFriend(
      @Query("userId") userId:string,
      @Body() {action,friendId}:FriendBodyDto
    ):Promise<Friend[]|Friend>{
      if (action == EFriendAction.ADD){
        return this.service.addFriend(userId,friendId);
      }
      return this.service.delFriend(userId,friendId);
    }
}