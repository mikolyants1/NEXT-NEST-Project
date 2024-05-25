import { Column, Entity,  JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({name:"user_invitations"})
export class Invitation {
  @PrimaryGeneratedColumn("uuid",{name:"id"})
  id:string;

  @Column({name:"addresser",type:"varchar",length:255,nullable:false})
  addresser:string;

  @Column({name:"recipient",type:"varchar",length:255,nullable:false})
  recipient:string;

  @ManyToOne(() => User,({invitations}:User) => invitations,{
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  @JoinColumn({name:"user_id",referencedColumnName:"id"})
  user:User;
}