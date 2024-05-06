import { Test, TestingModule } from "@nestjs/testing"
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "../entity/comment.entity";
import { User } from "../entity/user.entity";
import { AuthModule } from "../auth/auth.module";
import { PgConfig } from "../configs/pg.config";
import { ConfigModule } from "@nestjs/config";

describe("UserService", () => {
  let service:UserService;

  beforeEach(async () => {
    const module:TestingModule = await Test.createTestingModule({
      imports:[
        AuthModule,
        ConfigModule.forRoot({
          isGlobal:true,
          envFilePath:[
           "./src/env/.pg.env"
          ]
        }),
        TypeOrmModule.forRootAsync(PgConfig()),
        TypeOrmModule.forFeature([User,Comment])
      ],
      controllers:[UserController],
      providers:[UserService]
    }).compile();

    service = module.get<UserService>(UserService);
  });
  
  it("service should be defined", () => {
    expect(service).toBeDefined();
  });

  it("create user",async () => {
    const user = await service.createUser({
      username:"test_name1",
      password:"test_password1",
      tag:"@test_tag1"
    });
    expect(user.username).toBe("test_name1");
    expect(user.tag).toBe("@test_tag1")
  });

  it("find user",async () => {
    const user = await service.createUser({
      username:"test_name",
      password:"test_password",
      tag:"@test_tag"
    });
    expect(await service.getUser(user.id)).toBeDefined();
  });

  it("remove user",async () => {
    const user = await service.createUser({
      username:"test_name",
      password:"test_password",
      tag:"@test_tag"
    });
    await service.deleteUser(user.id);
    expect(await service.getUser(user.id)).not.toBeDefined();
  });

  it("update user",async () => {
    const user = await service.createUser({
      username:"test_name",
      password:"test_password",
      tag:"@test_tag"
    });
    const result = await service.updateUser(user.id,{
      username:"new_username1",
      password:"new_password",
      tag:"@new_tag1"
    });
    expect(result.username).toBe("new_username1");
    expect(result.tag).toBe("@new_tag1");
  });
})