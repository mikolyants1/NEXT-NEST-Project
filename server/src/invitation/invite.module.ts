import { Module } from "@nestjs/common";
import { InviteController } from "./invite.controller";
import { InviteService } from "./invite.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Invitation } from "src/entity/invite.entity";
import { User } from "src/entity/user.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports:[
    AuthModule,
    TypeOrmModule.forFeature([Invitation,User])
  ],
  controllers:[InviteController],
  providers:[InviteService]
})
export class InviteModule {}