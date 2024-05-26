"use server"

import { getFriends } from "@/api/query/friend/getFriend";
import { getUsers } from "@/api/query/user/getUsers";
import {type IFriend,type IUser } from "@/libs/types/type"
import { cookies } from "next/headers";

export const getFriendUsers = async ():Promise<IUser[]> => {
  const id = cookies().get("userId")?.value as string;
  const friends:IFriend[] = await getFriends(id);
  const users:IUser[] = await getUsers();
  return users.filter((u:IUser) => (
    friends.some((f:IFriend) => f.friend_id == u.id)
  ));
}