import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Friend } from "src/entity/friend.entity";
import { Invitation } from "src/entity/invite.entity";
import { User } from "src/entity/user.entity";
import { DeleteResult, Repository } from "typeorm";

@Injectable()
export class FriendService {
    constructor(
      @InjectRepository(User)
      private readonly users:Repository<User>,
      @InjectRepository(Friend)
      private readonly friends:Repository<Friend>,
      @InjectRepository(Invitation)
      private readonly invites:Repository<Invitation>
    ){}

    async getUserFriends(id:string):Promise<Friend[]>{
      const user:User = await this.users.findOneBy({id});
      return this.friends.findBy({user});
    }

    async addFriend(userId:string,friendId:string):Promise<Friend[]>{
      const user:User = await this.users.findOneBy({id:userId});
      const friend:User = await this.users.findOneBy({id:friendId});
      await this.invites.delete({addresser:friendId});
      const friend_add:Friend[] = this.friends.create([
        {user,friend_id:friendId},
        {user:friend,friend_id:userId}
      ]);
      return this.friends.save(friend_add);
    }

    async delFriend(userId:string,friendId:string):Promise<Friend>{
      const user:User = await this.users.findOneBy({id:userId});
      const friend:User = await this.users.findOneBy({id:friendId});
      await this.friends.delete({user:friend,friend_id:userId});
      const res:DeleteResult = await this.friends.delete({
        user,
        friend_id:friendId
      });
      return res.raw;
    }
}