import { Repository } from "typeorm";
import { AuthService } from "./auth.service"
import { User } from "../entity/user.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { PgConfig } from "../configs/pg.config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtConfig } from "../configs/jwt.config";
import { AuthController } from "./auth.controller";
import { ConfigModule } from "@nestjs/config";
import * as bc from "bcryptjs";

describe('AuthService', () => {
  const array_user_id:string[] = [];

  let service:AuthService;
  let userSource:Repository<User>;
  let jwtService:JwtService;

  beforeEach(async () => {
   const module:TestingModule = await Test.createTestingModule({
     imports:[
      TypeOrmModule.forRootAsync(PgConfig()),
      JwtModule.registerAsync(JwtConfig()),
      TypeOrmModule.forFeature([User]),
      ConfigModule.forRoot({
        envFilePath:[
          "./src/env/.pg.env",
          "./src/env/.jwt.env"
        ],
        isGlobal:true
      })
     ],
     controllers:[AuthController],
     providers:[AuthService]
   }).compile();
   service = module.get<AuthService>(AuthService);
   jwtService = module.get<JwtService>(JwtService);
   userSource = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it("service is defined",() => {
    expect(service).toBeDefined()
  })

  it("login check", async () => {
    const hash_pass = await bc.hash("authpass",10);
    const user:User = userSource.create({
      username:"authuser",
      password:hash_pass,
      tag:"@auth",
      raiting:0
    });
    await userSource.save(user);
    array_user_id.push(user.id);
    const login = await service.loginAuthUser({
      username:"authuser",
      password:"authpass",
      isLogin:true
    });
    const token = jwtService.verify(login.token);
    expect(token.id).toBe(user.id);
    expect(login.id).toBe(user.id);
    expect(login.tag).toBe(user.tag);
    expect(login.success).toBeTruthy();
  });

  it("regist check", async () => {
    const user:User = userSource.create({
      username:"authuser1",
      password:"authpass1",
      tag:"@auth1",
      raiting:0
    });
    await userSource.save(user);
    array_user_id.push(user.id);
    const regist = await service.registAuthUser(
      user.username
    );
    expect(regist.success).toBeFalsy();
  });

  it("access check", async () => {
    const hash_pass = await bc.hash("authpass2",10);
    const user:User = userSource.create({
      username:"authuser2",
      password:hash_pass,
      tag:"@auth2",
      raiting:0
    });
    await userSource.save(user);
    array_user_id.push(user.id);
    const access = await service.updateAccess({
      check_name:"authuser2",
      check_pass:"authpass2",
      id:user.id
    });
    expect(access).toBeTruthy();
  });

  afterAll(() => {
    for (const id of array_user_id) {
      userSource.delete({id});
    }
  })
})