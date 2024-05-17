"use server"

import {type ITask } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import {type AxiosResponse } from "axios";
import {type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function delTask(id:string):Promise<ITask> {
  const cookieStore:ReadonlyRequestCookies = cookies();
  const token = cookieStore.get("token")?.value;
  const userId = cookieStore.get("userId")?.value;
  revalidatePath("/main/[id]","page");
  return apiClient.delete<ITask>(`task/${id}`,{
    headers:{
      authorization:`Bearer ${token}`,
      "x-user":userId
    }
  })
  .then(({data}:AxiosResponse<ITask>)=>data)
}