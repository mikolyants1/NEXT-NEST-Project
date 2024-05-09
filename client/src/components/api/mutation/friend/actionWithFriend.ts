"use server"

import {type IFriend,type IFriendBody } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import {type AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function actionWithFriend(body:IFriendBody):Promise<IFriend>{
  const token = cookies().get("token")?.value;
  const userId = cookies().get("userId")?.value;
  revalidatePath("/main","layout");
  return apiClient.post<IFriend>(`friend?userId=${userId}`,body,{
    headers:{
      authorization:`Bearer ${token}`
    }
  })
  .then(({data}:AxiosResponse<IFriend>)=>data)
}