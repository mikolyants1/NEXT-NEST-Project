"use server"

import {type ITask,type ITaskUpdateBody } from "@/libs/types/type";
import { apiClient } from "../../apiClient";
import {type AxiosResponse } from "axios";
import {type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";

export async function updateTask({taskId,title}:ITaskUpdateBody):Promise<ITask> {
  const cookieStore:ReadonlyRequestCookies = cookies();
  const token = cookieStore.get("token")?.value;
  const userId = cookieStore.get("userId")?.value;
  return apiClient.put<ITask>(`task/${taskId}`,{title},{
    headers:{
      authorization:`Bearer ${token}`,
      "x-user":userId
    }
  })
  .then(({data}:AxiosResponse<ITask>)=>data)
}