"use server"

import {type ITask,type ITaskUpdateBody } from "@/libs/types/type";
import { apiClient } from "../../apiClient";
import {type AxiosResponse } from "axios";
import { getCookie } from "@/model/hooks/useCookie";

export async function updateTask({taskId,title}:ITaskUpdateBody):Promise<ITask> {
  const token = getCookie("token");
  const userId = getCookie("userId");
  return apiClient.put<ITask>(`task/${taskId}`,{title},{
    headers:{
      Authorization:`Bearer ${token}`,
      "x-user":userId
    }
  })
  .then(({data}:AxiosResponse<ITask>)=>data)
}