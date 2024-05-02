"use server"

import { IAccessBody } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import { AxiosResponse } from "axios";
import { cookies } from "next/headers";

export async function getAccess(body:IAccessBody):Promise<boolean>{
  const id = cookies().get("userId")?.value;
  return apiClient.post<boolean>(`user/access/${id}`,body)
  .then(({data}:AxiosResponse<boolean>)=>data);
}