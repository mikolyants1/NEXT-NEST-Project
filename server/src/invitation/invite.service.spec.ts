import { Repository } from "typeorm";
import { InviteService } from "./invite.service";
import { User } from "../entity/user.entity";
import { Invitation } from "../entity/invite.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { InviteController } from "./invite.controller";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { PgConfig } from "../configs/pg.config";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { JwtConfig } from "../configs/jwt.config";
import { JwtStrategy } from "../strategy/jwt.strategy";

describe("InviteService",() => {
  const array_invite_id:string[] = [];
  const array_user_id:string[] = [];

  let service:InviteService;
  let userSource:Repository<User>;
  let inviteSource:Repository<Invitation>;

  beforeEach(async () => {
    const module:TestingModule = await Test.createTestingModule({
        imports:[
          JwtModule.registerAsync(JwtConfig()),
          TypeOrmModule.forFeature([Invitation,User]),
          TypeOrmModule.forRootAsync(PgConfig()),
          ConfigModule.forRoot({
            envFilePath:[
              "./src/env/.jwt.env",
              "./src/env/.pg.env"
            ],
            isGlobal:true
          }),
        ],
        controllers:[InviteController],
        providers:[InviteService,JwtStrategy]
    }).compile();
     
    service = module.get<InviteService>(InviteService);
    userSource = module.get<Repository<User>>(getRepositoryToken(User));
    inviteSource = module.get<Repository<Invitation>>(getRepositoryToken(Invitation));
  });

  it("invite defined",() => {
    expect(service).toBeDefined();
  });

  it("create invite",async () => {
    const users = userSource.create([
      {
        username:"invite_name",
        password:"invite_pass",
        tag:"@invite",
        raiting:0
      },
      {
        username:"invite_name1",
        password:"invite_pass1",
        tag:"@invite1",
        raiting:0
      }
    ]);
    await userSource.save(users);
    array_user_id.push(users[0].id,users[1].id)
    const invite = await service.createInvite(users[0].id,{
        recipient:users[1].id
    });
    array_invite_id.push(invite.id);
    expect(invite.addresser).toBe(users[0].id);
    expect(invite.recipient).toBe(users[1].id);
  });

  it("del invite",async () => {
    const users = userSource.create([
      {
        username:"invite_name",
        password:"invite_pass",
        tag:"@invite",
        raiting:0
      },
      {
        username:"invite_name1",
        password:"invite_pass1",
        tag:"@invite1",
        raiting:0
      }
    ]);
    await userSource.save(users);
    array_user_id.push(users[0].id,users[1].id)
    const invite = await service.createInvite(users[0].id,{
        recipient:users[1].id
    });
    const del_res = await service.deleteInvite(invite.id);
    expect(del_res).toEqual(1);
  });
  
  afterEach(() => {
    for (const id of array_invite_id) {
      inviteSource.delete({id})
    }
    for (const id of array_user_id) {
      userSource.delete({id});
    }
  })
});