"use server"

import { getUsers } from "@/api/query/user/getUsers";
import { IUser } from "@/libs/types/type";
import { getCookie } from "@/model/hooks/getCookie";

export const getUsersByTag = async (tag:string):Promise<IUser[]> => {
  const id = getCookie("userId");
  if (!id) return [];
  const users:IUser[] = await getUsers();
  return users.filter((u:IUser) => u.id !== id)
  .filter((u:IUser) => u.tag.includes(tag));
}