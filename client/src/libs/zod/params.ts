import { z } from "zod";
import { EFriendAction } from "../enums/enum";

export const AuthLoginBodySchema = z.object({
  isLogin:z.boolean(),
  username:z.string().min(1,"username is required"),
  password:z.string().min(1,"password is required")
});

export const AuthAccessBodySchema = z.object({
  check_name:z.string().min(1,"check_name is required"),
  check_pass:z.string().min(1,"check_pass is required")
});

export const CommentCreateBodySchema = z.object({
  text:z.string().min(1,"text is required"),
  author:z.string().min(1,"author is required")
});

export const CommentUpdateBodySchema = z.object({
  text:z.string().min(1,"text is required"),
  id:z.string().ulid("id must be uuid")
});

export const FriendDeleteOrCreateBodySchema = z.object({
  friendId:z.string().uuid("griend id must be uuid"),
  action:z.enum([Object.values(EFriendAction)])
})