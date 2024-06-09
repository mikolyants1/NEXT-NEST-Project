import { Repository } from "typeorm";
import { AuthService } from "./auth.service"
import { User } from "../entity/user.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { PgConfig } from "../configs/pg.config";
import { JwtModule } from "@nestjs/jwt";
import { JwtConfig } from "../configs/jwt.config";
import { AuthController } from "./auth.controller";
import { ConfigModule } from "@nestjs/config";

describe('AuthService', () => {
  let service:AuthService;
  let userSource:Repository<User>;

  const array_user_id:string[] = [];

  beforeEach(async () => {
   const module:TestingModule = await Test.createTestingModule({
     imports:[
      TypeOrmModule.forRootAsync(PgConfig()),
      JwtModule.registerAsync(JwtConfig()),
      TypeOrmModule.forFeature([User]),
      ConfigModule.forRoot({
        envFilePath:[
          "../env/.pg.env",
          "../env/.jwt.env"
        ],
        isGlobal:true
      })
     ],
     controllers:[AuthController],
     providers:[AuthService]
   }).compile();

   service = module.get<AuthService>(AuthService);
   userSource = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it("service init",() => {
    expect(service).toBeDefined()
  })

  it("login check",async () => {
    const user = userSource.create({
      username:"authuser",
      password:"authpass",
      tag:"@auth",
      raiting:0
    });
    await userSource.save(user);
    array_user_id.push(user.id);
    const login = await service.loginAuthUser({
      username:user.username,
      password:user.password,
    });
    expect(login.id).toBe(user.id);
    expect(login.tag).toBe(user.tag);
    expect(login.success).toBeTruthy();
  });

  it("regist check",async () => {
    const user = userSource.create({
      username:"authuser1",
      password:"authpass1",
      tag:"@auth1",
      raiting:0
    });
    await userSource.save(user);
    array_user_id.push(user.id);
    const regist = await service.registAuthUser({
      username:user.username,
      password:user.password,
    });
    expect(regist.success).toBeFalsy();
  });

  it("access check",async () => {
    const user = userSource.create({
      username:"authuser2",
      password:"authpass2",
      tag:"@auth2",
      raiting:0
    });
    await userSource.save(user);
    array_user_id.push(user.id);
    const access = await service.updateAccess({
      check_name:user.username,
      check_pass:user.password,
    });
    expect(access).toBeFalsy();
  });

  afterAll(() => {
    for (const id of user_array_id) {
      userSource.delete({id});
    }
  })
})