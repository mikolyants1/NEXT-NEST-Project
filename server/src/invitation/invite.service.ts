import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InviteBodyDto } from "../dto/invite.dto";
import { Invitation } from "../entity/invite.entity";
import { User } from "../entity/user.entity";
import { DataSource, DeleteResult, QueryRunner, Repository } from "typeorm";

@Injectable()
export class InviteService {
    constructor(
      @InjectRepository(Invitation)
      private readonly invites:Repository<Invitation>,
      @InjectRepository(User)
      private readonly users:Repository<User>,
      private readonly connect:DataSource
    ){}

    async getInviteRecipient(id:string):Promise<Invitation[]>{
      const user:User = await this.users.findOneBy({id});
      return this.invites.findBy({user});
    }

    async getInviteAdresser(id:string):Promise<Invitation[]>{
      return this.invites.findBy({addresser:id});
    } 

    async deleteInvite(inviteId:string):Promise<number>{
     const invites:DeleteResult = await this.invites.delete({id:inviteId});
     return invites.affected;
    }

    async createInvite(userId:string,{recipient}:InviteBodyDto):Promise<Invitation>{
      const query:QueryRunner = this.connect.createQueryRunner();
      await query.connect();
      await query.startTransaction();
      try {
        const user:User = await query.manager
        .getRepository(User).findOneBy({id:recipient});
        const newInvite:Invitation = this.invites.create({
          addresser:userId,
          recipient,
          user
        });
        await query.manager.getRepository(Invitation).save(newInvite);
        await query.commitTransaction();
        return newInvite;
      } catch (e) {
        console.log("transaction error: ",e);
        await query.rollbackTransaction();
      } finally {
        await query.release();
      }
    }
}