"use server"

import {type ICommBody,type IComment } from "@/libs/types/type";
import { apiClient } from "../../apiClient";
import {type AxiosResponse } from "axios";
import { getCookie } from "@/model/hooks/getCookie";

export async function createComment({
  taskId,...body
}:ICommBody):Promise<IComment> {
  const token = getCookie("token");
  const userId = getCookie("userId");
  return apiClient.post<IComment>(
    `comments/${taskId}`,body,{
    headers:{
      Authorization:`Bearer ${token}`,
      "x-user":userId
    }
  })
  .then(({data}:AxiosResponse<IComment>)=>data)
}