"use server"

import { ICheckBody, ICheckRes } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import { AxiosResponse } from "axios";
import { cookies } from "next/headers";

export async function checkUser(body:ICheckBody):Promise<ICheckRes> {
    return apiClient.post<ICheckRes>("user/check",body)
    .then(({data}:AxiosResponse<ICheckRes>)=>{
      if (data.success && body.isLogin){
        cookies().set("token",data.token);
        cookies().set("userId",data.id);
      }
      return data;
    });
}