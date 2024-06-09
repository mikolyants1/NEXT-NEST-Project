"use server"

import type { ICheckBody, ICheckRes } from "@/libs/types/type";
import { apiClient } from "../../apiClient";
import type { AxiosResponse } from "axios";
import { cookies } from "next/headers";

export async function authUser(body:ICheckBody):Promise<ICheckRes> {
  return apiClient.post<ICheckRes>("auth/login",body)
  .then(({data}:AxiosResponse<ICheckRes>)=>{
    if (data.success && body.isLogin){
      cookies().set("token",data.token);
      cookies().set("userId",data.id);
    }
    return data;
  });
}