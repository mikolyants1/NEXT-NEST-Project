import { ICommUpdateBody, IComment } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import { AxiosResponse } from "axios";

export async function updateComment({
  id,token,userId,text
}:ICommUpdateBody):Promise<IComment> {
  return apiClient.put<IComment>(
  `comments/${id}?userId=${userId}`,{text},{
    headers:{
      authorization:`Bearer ${token}`
    }
  })
  .then(({data}:AxiosResponse<IComment>)=>data)
}