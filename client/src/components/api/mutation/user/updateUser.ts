"use server"

import {type IUser,type IUserBody } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import {type AxiosResponse } from "axios";
import {type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";

export async function updateUser(body:IUserBody):Promise<IUser> {
  const cookieStore:ReadonlyRequestCookies = cookies();
  const token = cookieStore.get("token")?.value;
  const id = cookieStore.get("userId")?.value;
    return apiClient.put<IUser>(`user/${id}?userId=${id}`,body,{
      headers:{
        authorization:`Bearer ${token}`
      }
    })
    .then(({data}:AxiosResponse<IUser>)=>data);
}