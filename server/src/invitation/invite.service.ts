import { Injectable, Logger } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { InviteBodyDto } from "../dto/invite.dto";
import { Invitation } from "../entity/invite.entity";
import { User } from "../entity/user.entity";
import { DataSource, QueryRunner, Repository } from "typeorm";

@Injectable()
export class InviteService {
  private readonly logger = new Logger(InviteService.name);

  constructor(
    @InjectRepository(Invitation)
    private readonly invites:Repository<Invitation>,
    @InjectRepository(User)
    private readonly users:Repository<User>,
    @InjectDataSource()
    private readonly connect:DataSource
  ){}

  async getAllInvites():Promise<Invitation[]>{
    return this.invites.find();
  }
  
  async getInviteRecipient(id:string):Promise<Invitation[]>{
    return this.invites.findBy({recipient:id});
  }

  async getInviteAdresser(id:string):Promise<Invitation[]>{
    return this.invites.findBy({addresser:id});
  } 

  async deleteInvite(inviteId:string):Promise<number>{
    const invites = await this.invites.delete({id:inviteId});
    return invites.affected;
  }

    async createInvite(userId:string,{recipient}:InviteBodyDto):Promise<Invitation>{
      const query:QueryRunner = this.connect.createQueryRunner();
      await query.connect();
      await query.startTransaction();
      try {
        const user:User = await this.users.findOneBy({id:recipient});
        const newInvite:Invitation = this.invites.create({
          addresser:userId,
          recipient,
          user
        });
        await query.commitTransaction();
        return this.invites.save(newInvite);
      } catch (e) {
        this.logger.error(e);
        await query.rollbackTransaction();
      } finally {
        await query.release();
      }
    }
}