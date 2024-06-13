"use server"

import { userApiQuery } from "@/api/user/userApiQuery";
import { IUser } from "@/libs/types/type";
import { getCookie } from "@/model/hooks/getCookie";

export const getUsersByTag = async (tag:string):Promise<IUser[]> => {
  const id = await getCookie("userId");
  if (!id) return [];
  const users = await userApiQuery<IUser[],unknown>("find");
  return users.filter((u:IUser) => u.id !== id)
  .filter((u:IUser) => u.tag.includes(tag));
}