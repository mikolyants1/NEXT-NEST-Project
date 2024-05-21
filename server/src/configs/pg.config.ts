import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Comment } from '../entity/comment.entity';
import { Friend } from '../entity/friend.entity';
import { Invitation } from '../entity/invite.entity';
import { Task } from '../entity/task.entity';
import { User } from '../entity/user.entity';

export const PgConfig = ():TypeOrmModuleAsyncOptions => ({
  imports:[ConfigModule],
  inject:[ConfigService],
  useFactory:(service:ConfigService) => {
    return {
      type:"postgres",
      username:"postgres" ||"test_name",
      password:"belek5002"||"test_pass",
      host:"localhost",
      port:5432 ,
      database:"testdb2"||"test_base",
      entities:[Comment,Friend,Invitation,Task,User],
      synchronize:true
    }
  }
});