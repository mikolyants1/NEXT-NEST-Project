import { Body, Controller, Get, Headers, Param, Post, UseGuards } from "@nestjs/common";
import { FriendService } from "./friend.service";
import { AuthGuard } from "../guards/auth.guard";
import { Friend } from "../entity/friend.entity";
import { FriendBodyDto } from "../dto/friend.dto";
import { EFriendAction } from "../enums/friend.enum";

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
      @Headers("userId") userId:string,
      @Body() {action,friendId}:FriendBodyDto
    ):Promise<Friend[]|number>{
      if (action == EFriendAction.ADD){
        return this.service.addFriend(userId,friendId);
      }
      return this.service.delFriend(userId,friendId);
    }
}