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
      username:service.get("PG_USERNAME"),
      password:service.get("PG_PASSWORD"),
      host:service.get("PG_HOST"),
      port:+service.get("PG_PORT"),
      database:service.get("PG_DATABASE"),
      entities:[Comment,Friend,Invitation,Task,User],
      synchronize:true
    }
  }
});