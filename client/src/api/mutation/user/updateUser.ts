"use server"

import {type IUser,type IUserBody } from "@/libs/types/type";
import { apiClient } from "../../apiClient";
import {type AxiosResponse } from "axios";
import { revalidatePath } from "next/cache";
import { getCookie } from "@/model/hooks/useCookie";

export async function updateUser(body:IUserBody):Promise<IUser> {
  const token = getCookie("token");
  const userId = getCookie("userId");
  return apiClient.put<IUser>(`user/${userId}`,body,{
    headers:{
      Authorization:`Bearer ${token}`,
      "x-user":userId
    }
  })
  .then(({data}:AxiosResponse<IUser>)=>{
    revalidatePath("/main/:id/profile");
    return data;
  });
}