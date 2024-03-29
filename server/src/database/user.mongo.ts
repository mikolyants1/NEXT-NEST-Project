import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Films } from "./films.mongo";
import { Roles } from "src/enums/role.enum";

@Schema()
export class Users extends Document {
    @Prop({
     type:String,
     required:true
    })
    name:string;
    
    @Prop({
     type:String,
     required:true
    })
    pass:string;

    @Prop({
      type:String,
      required:true
    })
    role:Roles;
    
    @Prop({
     type:[Films],
     required:true
    })
    films:[Films]
}

export const UserSchema = SchemaFactory.createForClass(Users);