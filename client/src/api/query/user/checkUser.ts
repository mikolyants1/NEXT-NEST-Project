"use server"

import type { ICheckBody, ICheckRes } from "@/libs/types/type";
import { apiClient } from "../../apiClient";
import type { AxiosResponse } from "axios";
import { cookies } from "next/headers";

export async function checkUser(body:ICheckBody):Promise<ICheckRes> {
    return apiClient.post<ICheckRes>("user/check",body)
    .then(({data}:AxiosResponse<ICheckRes>)=>{
      console.log(data)
      if (data.success && body.isLogin){
        cookies().set("token",data.token);
        cookies().set("userId",data.id);
      }
      return data;
    });
}