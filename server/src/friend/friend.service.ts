import { Injectable, Logger } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Friend } from "../entity/friend.entity";
import { Invitation } from "../entity/invite.entity";
import { User } from "../entity/user.entity";
import { DataSource, QueryRunner, Repository } from "typeorm";

@Injectable()
export class FriendService {
  private readonly logger = new Logger(FriendService.name);

    constructor(
      @InjectRepository(User)
      private readonly users:Repository<User>,
      @InjectRepository(Friend)
      private readonly friends:Repository<Friend>,
      @InjectRepository(Invitation)
      private readonly invites:Repository<Invitation>,
      @InjectDataSource()
      private readonly source:DataSource
    ){}

    async getUserFriends(id:string):Promise<Friend[]>{
      const user:User = await this.users.findOneBy({id});
      return this.friends.findBy({user});
    }

    async addFriend(userId:string,friendId:string):Promise<Friend[]>{
      const query:QueryRunner = this.source.createQueryRunner();
      await query.connect();
      await query.startTransaction();
      try {
        const user:User = await this.users.findOneBy({id:userId});
        const friend:User = await this.users.findOneBy({id:friendId});
        await this.invites.delete({addresser:friendId});
        const friend_add:Friend[] = this.friends.create([
          {user,friend_id:friendId},
          {user:friend,friend_id:userId}
        ]);
        const result:Friend[] = await this.friends.save(friend_add);
        await query.commitTransaction();
        return result;
      } catch (e){
        this.logger.error(e);
        await query.rollbackTransaction();
      } finally {
        await query.release();
      }
    }

    async delFriend(userId:string,friendId:string):Promise<Friend[]>{
      const query:QueryRunner = this.source.createQueryRunner();
      await query.connect();
      await query.startTransaction();
      try {
      const user:User = await this.users.findOneBy({id:userId});
      const friend:User = await this.users.findOneBy({id:friendId});
      const friend_entity = await this.friends.findOneBy({
        user:friend,
        friend_id:userId
      });
      const user_entity = await this.friends.findOneBy({
        user,
        friend_id:friendId
      });
      const result = await this.friends.remove([
        friend_entity,
        user_entity
      ]);
      await query.commitTransaction();
      return result;
      } catch (e){
        this.logger.error(e);
        await query.rollbackTransaction();
      } finally {
        await query.release();
      }
    }
}