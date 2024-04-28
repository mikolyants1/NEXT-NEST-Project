import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Comment } from 'src/entity/comment.entity';
import { Friend } from 'src/entity/friend.entity';
import { Invitation } from 'src/entity/invite.entity';
import { Task } from 'src/entity/task.entity';
import { User } from 'src/entity/user.entity';

export const PgConfig = ():TypeOrmModuleAsyncOptions => ({
  imports:[ConfigModule],
  inject:[ConfigService],
  useFactory:(service:ConfigService)=>({
    type:"postgres",
    host:service.get("PG_HOST"),
    port:service.get("PG_PORT"),
    username:service.get("PG_USERNAME"),
    password:service.get("PG_PASSWORD"),
    database:service.get("PG_DATABASE"),
    entities:[Friend,User,Comment,Invitation,Task],
    synchronize:true
  })
});