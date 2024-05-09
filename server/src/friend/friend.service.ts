import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Friend } from "src/entity/friend.entity";
import { Invitation } from "src/entity/invite.entity";
import { User } from "src/entity/user.entity";
import { DataSource, DeleteResult, QueryRunner, Repository } from "typeorm";

@Injectable()
export class FriendService {
    constructor(
      @InjectRepository(User)
      private readonly users:Repository<User>,
      @InjectRepository(Friend)
      private readonly friends:Repository<Friend>,
      private readonly connect:DataSource
    ){}

    async getUserFriends(id:string):Promise<Friend[]>{
      const user:User = await this.users.findOneBy({id});
      return this.friends.findBy({user});
    }

    async addFriend(userId:string,friendId:string):Promise<Friend[]>{
      const query:QueryRunner = this.connect.createQueryRunner();
      await query.connect();
      await query.startTransaction();
      try {
        const users:Repository<User> = query.manager.getRepository(User);
        const user:User = await users.findOneBy({id:userId});
        const friend:User = await users.findOneBy({id:friendId});
        await query.manager.getRepository(Invitation)
        .delete({addresser:friendId});
        const friend_add:Friend[] = this.friends.create([
          {user,friend_id:friendId},
          {user:friend,friend_id:userId}
        ]);
        const result:Friend[] = await query.manager
        .getRepository(Friend).save(friend_add);
        await query.commitTransaction();
        return result;
      } catch (e){
        console.log("friend transaction error",e);
        await query.rollbackTransaction();
      } finally {
        await query.release();
      }
    }

    async delFriend(userId:string,friendId:string):Promise<Friend>{
      const query:QueryRunner = this.connect.createQueryRunner();
      await query.connect();
      await query.startTransaction();
      try {
      const user:User = await query.manager
      .getRepository(User).findOneBy({id:userId});
      const friend:User = await query.manager
      .getRepository(User).findOneBy({id:friendId});
      await query.manager.getRepository(Friend).delete({
        user:friend,
        friend_id:userId
      });
      const res:DeleteResult = await query
      .manager.getRepository(Friend).delete({
        user,
        friend_id:friendId
      });
      await query.commitTransaction();
      return res.raw;
      } catch (e){
        console.log("friend transaction error",e);
        await query.rollbackTransaction();
      } finally {
        await query.release();
      }
    }
}