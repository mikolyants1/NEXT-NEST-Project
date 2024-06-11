import { Body, Controller, Delete, Get, Headers, Param, Post, Query } from "@nestjs/common";
import { InviteService } from "./invite.service";
import { Invitation } from "../entity/invite.entity";
import { InviteBodyDto } from "../dto/invite.dto";
import { Auth } from "../guards/apply.guard";
import { EInviteAction } from "../enums/invite.enum";

@Controller("invitation")
export class InviteController {
  constructor(private readonly service:InviteService){}

  @Get(":id")
  async getInvites(
    @Param("id") id:string,
    @Query("type") type:EInviteAction
  ):Promise<Invitation[]>{
    if (type == EInviteAction.ADRESSER){
      return this.service.getInviteAdresser(id);
    } else {
      return this.service.getInviteRecipient(id);
    }
  }

  @Auth()
  @Delete(":id")
  async deleteInvitation(@Param("id") id:string):Promise<number>{
    return this.service.deleteInvite(id);
  }

  @Auth()
  @Post()
  async createInvitation(
    @Headers("x-user") userId:string,
    @Body() body:InviteBodyDto
  ):Promise<Invitation>{
    return this.service.createInvite(userId,body);
  }
}