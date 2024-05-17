"use server"

import { getUsers } from "@/api/query/user/getUsers";
import { IUser } from "@/libs/types/type";
import { cookies } from "next/headers";

export const getUsersByTag = async (tag:string):Promise<IUser[]> => {
  const id = cookies().get("userId")?.value;
  if (!id) return [];
  const users:IUser[] = await getUsers();
  return users.filter((u:IUser) => u.id !== id)
  .filter((u:IUser) => u.tag.includes(tag));
}