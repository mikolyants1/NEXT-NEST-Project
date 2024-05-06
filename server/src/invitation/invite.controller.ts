import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { InviteService } from "./invite.service";
import { Invitation } from "src/entity/invite.entity";
import { AuthGuard } from "src/guards/auth.guard";
import { InviteBodyDto } from "src/dto/invite.dto";

@Controller("invitation")
export class InviteController {
  constructor(private readonly service:InviteService){}

  @Get("recipient/:id")
  async getRecipient(@Param("id") id:string):Promise<Invitation[]>{
    return this.service.getInviteRecipient(id);
  }

  @Get("adresser/:id")
  async getAdresser(@Param("id") id:string):Promise<Invitation[]>{
    return this.service.getInviteAdresser(id);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  async deleteInvitation(@Param("id") inviteId:string):Promise<Invitation>{
    return this.service.deleteInvite(inviteId);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createInvitation(
    @Query("userId") userId:string,
    @Body() body:InviteBodyDto
  ):Promise<Invitation>{
    return this.service.createInvite(userId,body);
  }
}