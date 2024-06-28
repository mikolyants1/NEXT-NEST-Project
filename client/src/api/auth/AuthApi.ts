import { IAccessBody, ICheckBody, ICheckRes } from "@/libs/types";
import { apiClient } from "../apiClient";
import { AxiosResponse } from "axios";
import { getCookie } from "@/model/hooks/getCookie";
import { setCookie } from "@/model/hooks/setCookie";
import { AuthAccessBodySchema, AuthLoginBodySchema } from "@/libs/zod/params";

export class AuthApi {
  async login(body:ICheckBody):Promise<ICheckRes> {
    const parse_body = AuthLoginBodySchema.parse(body);
    return apiClient.post<ICheckRes>("auth/login",parse_body)
    .then(async ({data}:AxiosResponse<ICheckRes>) => {
      if (data.success && parse_body.isLogin){
       await setCookie("token",data.token);
       await setCookie("userId",data.id);
      }
      return data;
    });
  }

  async access(body:IAccessBody):Promise<boolean>{
    const id = await getCookie("userId");
    const token = await getCookie("token");
    const parse_body = AuthAccessBodySchema.parse(body);
    return apiClient.post<boolean>('auth/access',{
      ...parse_body,id
    },{
      headers:{
        Authorization:`Bearer ${token}`,
        "x-user":id
      }
    }).then(({data}:AxiosResponse<boolean>) => data);
  }
}