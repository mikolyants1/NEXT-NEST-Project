"use server"

import {type ITask } from "@/libs/types/type";
import { apiClient } from "../../apiClient";
import {type AxiosResponse } from "axios";
import { revalidatePath } from "next/cache";
import { getCookie } from "@/model/hooks/getCookie";

export async function delTask(id:string):Promise<ITask> {
  const token = getCookie("token");
  const userId = getCookie("userId");
  revalidatePath("/main/[id]","page");
  return apiClient.delete<ITask>(`task/${id}`,{
    headers:{
      Authorization:`Bearer ${token}`,
      "x-user":userId
    }
  })
  .then(({data}:AxiosResponse<ITask>)=>data)
}