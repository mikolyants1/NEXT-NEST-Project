import { z } from "zod";

export const UserSchema = z.object({
  id:z.string().uuid("id must be uuid"),
  username:z.string().min(1,"username is required"),
  tag:z.string().includes("@",{message:"@ is required"}),
  raiting:z.number().int("raiting must be integer")
});

export const TaskSchema = z.object({
  id:z.string().uuid("id must be uuid"),
  title:z.string().min(1,"title is required")
});

export const CommentSchema = z.object({
  id:z.string().uuid("id must be uuid"),
  text:z.string().min(1,"text is required"),
  author:z.string().min(1,"author name is required"),
  author_id:z.string().min(1,"author id is required"),
  date:z.string().transform(d => parseInt(d)),
  was_update:z.boolean()
});
  
export const FriendSchema = z.object({
  id:z.string().uuid("id must be uuid"),
  friend_id:z.string().min(1,"friend id is required"),
})
  
export const InviteSchema = z.object({
  id:z.string().uuid("id must be uuid"),
  addresser:z.string().min(1,"adresser is required"),
  recipient:z.string().min(1,"recipient is required")
})