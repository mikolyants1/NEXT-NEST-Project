"use server"

import type { ICommUpdateBody, IComment } from "@/libs/types/type";
import { apiClient } from "../../apiClient";
import {type AxiosResponse } from "axios";
import { getCookie } from "@/model/hooks/useCookie";

export async function updateComment({id,text}:ICommUpdateBody):Promise<IComment> {
  const token = getCookie("token");
  const userId = getCookie("userId");
  return apiClient.put<IComment>(`comments/${id}`,{text},{
    headers:{
      Authorization:`Bearer ${token}`,
      "x-user":userId
    }
  })
  .then(({data}:AxiosResponse<IComment>)=>data)
}