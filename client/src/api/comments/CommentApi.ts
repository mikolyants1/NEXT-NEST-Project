import { ICommBody, ICommUpdateBody, IComment } from "@/libs/types";
import { getCookie } from "@/model/hooks/getCookie";
import { apiClient } from "../apiClient";
import { AxiosResponse } from "axios";
import { z } from "zod";
import { CommentSchema } from "@/libs/zod/data";

export class CommentApi {
  async create({taskId,...body}:ICommBody):Promise<IComment> {
    const token = await getCookie("token");
    const userId = await getCookie("userId");
    return apiClient.post<IComment>(
      `comments/${taskId}`,body,{
      headers:{
        Authorization:`Bearer ${token}`,
        "x-user":userId
      }
    }).then(({data}:AxiosResponse<IComment>) => data);
  }

  async remove(id:string):Promise<IComment> {
    const token = await getCookie("token");
    const userId = await getCookie("userId");
    return apiClient.delete<IComment>(`comments/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`,
        "x-user":userId
      }
    }).then(({data}:AxiosResponse<IComment>) => data)
  }

  async update({id,text}:ICommUpdateBody):Promise<IComment> {
    const token = await getCookie("token");
    const userId = await getCookie("userId");
    return apiClient.put<IComment>(`comments/${id}`,{text},{
      headers:{
        Authorization:`Bearer ${token}`,
        "x-user":userId
      }
    }).then(({data}:AxiosResponse<IComment>) => data);
  }

  async find(id:string):Promise<IComment[]> {
    const {data} = await apiClient.get<IComment[]>(`comments/${id}`);
    const map_schema = z.array(CommentSchema);
    return map_schema.parse(data);
  }
}