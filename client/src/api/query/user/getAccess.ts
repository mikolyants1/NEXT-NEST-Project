"use server"

import type { IAccessBody } from "@/libs/types/type";
import { apiClient } from "../../apiClient";
import type { AxiosResponse } from "axios";
import { getCookie } from "@/model/hooks/useCookie";

export async function getAccess(body:IAccessBody):Promise<boolean>{
  const id = getCookie("userId");
  return apiClient.post<boolean>(`user/access/${id}`,body)
  .then(({data}:AxiosResponse<boolean>)=>data);
}