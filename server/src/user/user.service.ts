import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserCreateDto } from "../dto/user.dto";
import { DeleteResult, Repository } from "typeorm";
import * as bc from 'bcryptjs';
import { User } from "../entity/user.entity";
import { Comment } from "../entity/comment.entity";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
    constructor(
      @InjectRepository(User)
      private readonly users:Repository<User>,
      @InjectRepository(Comment)
      private readonly comments:Repository<Comment>,
      private readonly jwt:JwtService
    ){}
    
    async getUsers():Promise<User[]>{
      return this.users.find();
    }

    async getUser(id:string):Promise<User>{
      return this.users.findOneBy({id});
    }

    async createUser(body:UserCreateDto):Promise<User>{
      const hash_pass = await bc.hash(body.password,10);
      const newUser:User = this.users.create({
        username:body.username,
        tag:body.tag,
        password:hash_pass,
        raiting:0,
      });
      return this.users.save(newUser);
    }

    async deleteUser(id:string):Promise<number>{
      const user:DeleteResult = await this.users.delete({id});
      return user.affected;
    }

    async updateUser(id:string,body:UserCreateDto):Promise<User>{
      const user:User = await this.users.findOneBy({id});
      if (body.username && body.username !== user.username){
        await this.comments.update({author:user.username},{
          author:body.username
        });
      }
      const password = await bc.hash(body.password,10);
       await this.users.update({id},{
        username:body.username || user.username,
        password:body.password ? password : user.password,
        tag:body.tag || user.tag
      });
      return this.users.findOneBy({id});
    }
}