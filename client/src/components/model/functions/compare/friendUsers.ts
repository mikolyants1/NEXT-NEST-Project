"use server"

import { getFriends } from "@/components/api/query/friend/getFriend";
import { getUsers } from "@/components/api/query/user/getUsers";
import {type IFriend,type IUser } from "@/components/libs/types/type"
import { cookies } from "next/headers";

export const getFriendUsers = async ():Promise<IUser[]> => {
  const id = cookies().get("userId")?.value;
  if (!id) return [];
  const friends:IFriend[] = await getFriends(id);
  const users:IUser[] = await getUsers();
  return users.filter((u:IUser) => (
    friends.some((f:IFriend) => f.friend_id == u.id)
  ));
}