import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Comment } from '../entity/comment.entity';
import { Friend } from '../entity/friend.entity';
import { Task } from '../entity/task.entity';
import { Invitation } from '../entity/invite.entity';

export const PgConfig = ():TypeOrmModuleAsyncOptions => ({
  imports:[ConfigModule],
  inject:[ConfigService],
  useFactory:(config:ConfigService) => ({
    type:"postgres",
    username:config.get<string>("POSTGRES_USER"),
    password:config.get<string>("POSTGRES_PASSWORD"),
    host:config.get<string>("POSTGRES_HOST"),
    port:config.get<number>("POSTGRES_PORT"),
    database:config.get<string>("POSTGRES_DB"),
    entities:[User,Comment,Friend,Task,Invitation],
    synchronize:true
  })
});