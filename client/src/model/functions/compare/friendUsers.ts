"use server"

import { friendApiQuery } from "@/api/friend/friendApiQuery";
import { userApiQuery } from "@/api/user/userApiQuery";
import {type IFriend,type IUser } from "@/libs/types"
import { getCookie } from "@/model/hooks/getCookie";

export const getFriendUsers = async ():Promise<IUser[]> => {
  const id = await getCookie("userId");
  if (!id) return [];
  const friends = await friendApiQuery<IFriend[],string>("find",id);
  const users = await userApiQuery<IUser[],unknown>("find");
  return users.filter((u:IUser) => (
    friends.some((f:IFriend) => f.friend_id == u.id)
  ));
}