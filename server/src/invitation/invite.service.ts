import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InviteBodyDto } from "src/dto/invite.dto";
import { Invitation } from "src/entity/invite.entity";
import { User } from "src/entity/user.entity";
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class InviteService {
    constructor(
      @InjectRepository(Invitation)
      private readonly invites:Repository<Invitation>,
      @InjectRepository(User)
      private readonly users:Repository<User>
    ){}

    async getInviteRecipient(id:string):Promise<Invitation[]>{
      const user:User = await this.users.findOneBy({id});
      return this.invites.findBy({user});
    }

    async getInviteAdresser(id:string):Promise<Invitation[]>{
      return this.invites.findBy({addresser:id});
    } 

    async deleteInvite(userId:string,inviteId:string):Promise<Invitation>{
     const invites:DeleteResult = await this.invites.delete({id:inviteId});
     return invites.raw;
    }

    async createInvite(userId:string,{recipient}:InviteBodyDto):Promise<Invitation>{
      const user:User = await this.users.findOneBy({id:recipient});
      const newInvite:Invitation = this.invites.create({
        addresser:userId,
        recipient,
        user
      });
      return this.invites.save(newInvite);
    }
}