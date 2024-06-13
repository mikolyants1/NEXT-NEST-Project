import { IAccessBody, ICheckBody, ICheckRes } from "@/libs/types/type";
import { apiClient } from "../apiClient";
import { AxiosResponse } from "axios";
import { getCookie } from "@/model/hooks/getCookie";
import { setCookie } from "@/model/hooks/setCookie";

export class AuthApi {
  async login(body:ICheckBody):Promise<ICheckRes> {
    return apiClient.post<ICheckRes>("auth/login",body)
    .then(async ({data}:AxiosResponse<ICheckRes>) => {
      if (data.success && body.isLogin){
       await setCookie<string>("token",data.token);
       await setCookie<string>("userId",data.id);
      }
      return data;
    });
  }

  async access(body:IAccessBody):Promise<boolean>{
    const id = await getCookie("userId");
    const token = await getCookie("token");
    return apiClient.post<boolean>('auth/access',{
      ...body,id
    },{
      headers:{
        Authorization:`Bearer ${token}`,
        "x-user":id
      }
    }).then(({data}:AxiosResponse<boolean>) => data);
  }
}