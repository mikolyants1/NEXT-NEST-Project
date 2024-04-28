import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Comment } from "./comment.entity";

@Entity({name:"user_tasks"})
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id:string;

  @Column({name:"title",type:"varchar",length:255,nullable:false})
  title:string;

  @ManyToOne(()=>User,({tasks}:User)=>tasks,{
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  @JoinColumn({name:"user_id"})
  user:User;

  @OneToMany(()=>Comment,({task}:Comment)=>task)
  @JoinColumn({name:"comments"})
  comments:Comment[];
}