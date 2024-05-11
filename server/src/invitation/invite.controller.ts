import { Body, Controller, Delete, Get, Headers, Param, Post, UseGuards } from "@nestjs/common";
import { InviteService } from "./invite.service";
import { Invitation } from "../entity/invite.entity";
import { AuthGuard } from "../guards/auth.guard";
import { InviteBodyDto } from "../dto/invite.dto";

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
  async deleteInvitation(@Param("id") id:string):Promise<number>{
    return this.service.deleteInvite(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createInvitation(
    @Headers("userId") userId:string,
    @Body() body:InviteBodyDto
  ):Promise<Invitation>{
    return this.service.createInvite(userId,body);
  }
}