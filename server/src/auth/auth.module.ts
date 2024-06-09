import { Logger, Module, OnModuleInit } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { JwtConfig } from "../configs/jwt.config";
import { JwtStrategy } from "../strategy/jwt.strategy";


@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(JwtConfig())
  ],
  controllers:[AuthController],
  providers:[AuthService,JwtStrategy]
})
export class AuthModule implements OnModuleInit {
   onModuleInit() {
     const logger = new Logger(AuthModule.name);
     logger.log("auth module init");
   }
}