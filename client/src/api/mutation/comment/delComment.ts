"use server"

import {type IComment } from "@/libs/types/type";
import { apiClient } from "../../apiClient";
import {type AxiosResponse } from "axios";
import {type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { getCookie } from "@/model/hooks/getCookie";

export async function delComment(id:string):Promise<IComment> {
  const token = getCookie("token");
  const userId = getCookie("userId");
  return apiClient.delete<IComment>(`comments/${id}`,{
    headers:{
      Authorization:`Bearer ${token}`,
      "x-user":userId
    }
  })
  .then(({data}:AxiosResponse<IComment>)=>data)
}