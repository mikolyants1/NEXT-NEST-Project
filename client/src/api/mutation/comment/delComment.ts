"use server"

import {type IComment } from "@/libs/types/type";
import { apiClient } from "../../apiClient";
import {type AxiosResponse } from "axios";
import {type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";

export async function delComment(id:string):Promise<IComment> {
  const cookieStore:ReadonlyRequestCookies = cookies();
  const token = cookieStore.get("token")?.value;
  const userId = cookieStore.get("userId")?.value;
  return apiClient.delete<IComment>(`comments/${id}`,{
    headers:{
      Authorization:`Bearer ${token}`,
      "x-user":userId
    }
  })
  .then(({data}:AxiosResponse<IComment>)=>data)
}