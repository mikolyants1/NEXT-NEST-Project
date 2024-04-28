import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from "src/configs/jwt.config";
import { AuthService } from "./auth.service";

@Module({
  imports:[
    JwtModule.registerAsync(JwtConfig())
  ],
  providers:[AuthService],
  exports:[AuthService]
})
export class AuthModule {}