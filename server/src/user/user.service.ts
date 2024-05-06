import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateAccessDto, UserBodyDto, UserCreateDto, UserResDto } from "../dto/user.dto";
import { DeleteResult, Repository } from "typeorm";
import * as bc from 'bcryptjs';
import { AuthService } from "../auth/auth.service";
import { User } from "../entity/user.entity";
import { Comment } from "../entity/comment.entity";

@Injectable()
export class UserService {
    constructor(
      @InjectRepository(User)
      private readonly users:Repository<User>,
      @InjectRepository(Comment)
      private readonly comments:Repository<Comment>,
      private readonly jwt:AuthService
    ){}

    async getUsers():Promise<User[]>{
      return this.users.find();
      
    }

    async getUser(id:string):Promise<User>{
      return this.users.findOneBy({id});
    }

    async createUser({password,tag,username}:UserCreateDto):Promise<User>{
      const hash_pass = await bc.hash(password,10);
      const newUser:User = this.users.create({
        username,
        tag,
        password:hash_pass,
        raiting:0,
      });
      return this.users.save(newUser);
    }

    async checkUser({username,password,isLogin}:UserBodyDto):Promise<UserResDto>{
      const users:User[] = await this.users.find();
      const user:User = users.find((i:User) => (
        i.username == username && bc.compare(password,i.password)
      ));
      const token:string = user ? this.jwt.sign(user) : "";
      return {
        id: user ? user.id : "",
        token,
        success:Boolean(user) == isLogin,
        tag:user ? user.tag : ""
      }
    }

    async deleteUser(id:string):Promise<User>{
      const user:DeleteResult = await this.users.delete({id});
      return user.raw;
    }

    async updateAccess(id:string,{check_name,check_pass}:UpdateAccessDto):Promise<boolean>{
      const {username,password}:User = await this.users.findOneBy({id});
      const correctName:boolean = username == check_name;
      const correctPass:boolean = bc.compareSync(check_pass,password);
      return correctName && correctPass;
    }

    async updateUser(id:string,{password,username,tag}:UserCreateDto):Promise<User>{
      const user:User = await this.users.findOneBy({id});
      if (username && username !== user.username){
        await this.comments.update({author:user.username},{
          author:user.username
        });
      }
       await this.users.update({id},{
        username:username || user.username,
        password:password ? bc.hashSync(password,10) : user.password,
        tag:tag || user.tag
      });
      return this.users.findOneBy({id});
    }

    async getUserTags():Promise<string[]>{
      const users:User[] = await this.users.find();
      return users.map((u:User) => u.tag);
    }
}