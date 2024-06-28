import { ICommBody, ICommUpdateBody, IComment } from "@/libs/types";
import { getCookie } from "@/model/hooks/getCookie";
import { apiClient } from "../apiClient";
import { AxiosResponse } from "axios";
import { z } from "zod";
import { CommentSchema } from "@/libs/zod/data";
import { CommentCreateBodySchema, CommentUpdateBodySchema } from "@/libs/zod/params";

export class CommentApi {
  async create({taskId,...body}:ICommBody):Promise<IComment> {
    const token = await getCookie("token");
    const userId = await getCookie("userId");
    const parse_body = CommentCreateBodySchema.parse(body);
    return apiClient.post<IComment>(
     `comments/${taskId}`,parse_body,{
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

  async update(body:ICommUpdateBody):Promise<IComment> {
    const token = await getCookie("token");
    const userId = await getCookie("userId");
    const { id, text } = CommentUpdateBodySchema.parse(body);
    return apiClient.put<IComment>(
    `comments/${id}`,{text},{
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