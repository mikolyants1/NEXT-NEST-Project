"use server"

import type { IAccessBody } from "@/libs/types/type";
import { apiClient } from "../../apiClient";
import type { AxiosResponse } from "axios";
import { getCookie } from "@/model/hooks/getCookie";

export async function getAccess(body:IAccessBody):Promise<boolean>{
  const id = getCookie("userId");
  const token = getCookie("token");
  return apiClient.post<boolean>('auth/access',{
    ...body,id
  },{
    headers:{
      Authorization:`Bearer ${token}`,
      "x-user":id
    }
  }).then(({data}:AxiosResponse<boolean>)=>data);
}