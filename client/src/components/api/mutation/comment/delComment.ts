import { ICommDelBody, IComment } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import { AxiosResponse } from "axios";

export async function delComment({
  id,token,userId
}:ICommDelBody):Promise<IComment> {
  return apiClient.delete<IComment>(
  `comments/${id}?userId=${userId}`,{
    headers:{
      authorization:`Bearer ${token}`
    }
  })
  .then(({data}:AxiosResponse<IComment>)=>data)
}