"use server"

import {type IFriend,type IFriendBody } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import {type AxiosResponse } from "axios";
import {type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function actionWithFriend(body:IFriendBody):Promise<IFriend>{
  const cookieStore:ReadonlyRequestCookies = cookies();
  const token = cookieStore.get("token")?.value;
  const userId = cookieStore.get("userId")?.value;
  revalidatePath("/main","layout");
  return apiClient.post<IFriend>(`friend?userId=${userId}`,body,{
    headers:{
      authorization:`Bearer ${token}`
    }
  })
  .then(({data}:AxiosResponse<IFriend>)=>data)
}