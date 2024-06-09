"use server"

import {type ITask } from "@/libs/types/type";
import { apiClient } from "../../apiClient";
import {type AxiosResponse } from "axios";
import { getCookie } from "@/model/hooks/getCookie";

export async function createTask(title:string):Promise<ITask> {
  const token = getCookie("token");
  const userId = getCookie("userId");
  return apiClient.post<ITask>("task",{title},{
    headers:{
      Authorization:`Bearer ${token}`,
      "x-user":userId
    }
  })
  .then(({data}:AxiosResponse<ITask>)=>data)
}