import {  ICommBody, ICommDelBody, IComment } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import { AxiosResponse } from "axios";

export async function createComment({
  userId,token,taskId,...body
}:ICommBody):Promise<IComment> {
  return apiClient.post<IComment>(
  `comments/${taskId}?userId=${userId}`,body,{
    headers:{
      authorization:`Bearer ${token}`
    }
  })
  .then(({data}:AxiosResponse<IComment>)=>data)
}