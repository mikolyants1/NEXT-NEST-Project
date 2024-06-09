"use server"

import {type IFriend,type IFriendBody } from "@/libs/types/type";
import { apiClient } from "../../apiClient";
import {type AxiosResponse } from "axios";
import { revalidatePath } from "next/cache";
import { getCookie } from "@/model/hooks/getCookie";

export async function actionWithFriend(body:IFriendBody):Promise<IFriend>{
  const token = getCookie("token");
  const userId = getCookie("userId");
  revalidatePath("/main","layout");
  return apiClient.post<IFriend>(`friend`,body,{
    headers:{
      Authorization:`Bearer ${token}`,
      "x-user":userId
    }
  })
  .then(({data}:AxiosResponse<IFriend>) => data);
}