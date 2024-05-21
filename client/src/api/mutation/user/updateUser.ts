"use server"

import {type IUser,type IUserBody } from "@/libs/types/type";
import { apiClient } from "../../apiClient";
import {type AxiosResponse } from "axios";
import {type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateUser(body:IUserBody):Promise<IUser> {
  const cookieStore:ReadonlyRequestCookies = cookies();
  const token = cookieStore.get("token")?.value;
  const userId = cookieStore.get("userId")?.value;
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