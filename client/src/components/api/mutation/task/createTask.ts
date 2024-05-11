"use server"

import {type ITask } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import {type AxiosResponse } from "axios";
import {type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";

export async function createTask(title:string):Promise<ITask> {
  const cookieStore:ReadonlyRequestCookies = cookies();
  const token = cookieStore.get("token")?.value;
  const userId = cookieStore.get("userId")?.value;
  return apiClient.post<ITask>("task",{title},{
    headers:{
      authorization:`Bearer ${token}`,
      "x-user":userId
    }
  })
  .then(({data}:AxiosResponse<ITask>)=>data)
}