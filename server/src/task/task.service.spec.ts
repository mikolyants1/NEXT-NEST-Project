import { Test } from "@nestjs/testing";
import { TaskService } from "./task.service";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskController } from "./task.controller";
import { User } from "../entity/user.entity";
import { Task } from "../entity/task.entity";
import { PgConfig } from "../configs/pg.config";

describe("TaskService",() => {
  let service:TaskService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports:[
        AuthModule,
        TypeOrmModule.forFeature([User,Task]),
        TypeOrmModule.forRootAsync(PgConfig())
      ],
      controllers:[TaskController],
      providers:[TaskService]
    }).compile();
    service = module.get<TaskService>(TaskService);
  });

  it("should be",() => {
    expect(service).toBeDefined();
  });

  it("",() => {
 
  });
});