
import { IUser, IUserBody } from "@/libs/types";
import { apiClient } from "../apiClient";
import { AxiosResponse } from "axios";
import { revalidatePath } from "next/cache";
import { getCookie } from "@/model/hooks/getCookie";
import { z } from "zod";
import { UserSchema } from "@/libs/zod/data";

export class UserApi {
  async find():Promise<IUser[]> {
    const {data} = await apiClient.get<IUser[]>("user");
    const map_schema = z.array(UserSchema);
    return map_schema.parse(data);
  }

  async findById(id:string):Promise<IUser> {
    const {data} = await apiClient.get<IUser>(`user/${id}`);
    return UserSchema.parse(data);
  }
  
  async findTags():Promise<string[]> {
    const {data} = await apiClient.get<IUser[]>("user");
    return data.map(u => u.tag);
  }

  async create(body:IUserBody):Promise<IUser> {
    return apiClient.post<IUser>("user",body)
    .then(({data}:AxiosResponse<IUser>) => data);
  }

  async remove():Promise<IUser> {
    const userId = await getCookie("userId");
    const token = await getCookie("token");
    return apiClient.delete<IUser>(`user/${userId}`,{
      headers:{
        Authorization:`Bearer ${token}`,
        "x-user":userId
      }
    }).then(({data}:AxiosResponse<IUser>) => data);
  }

  async update(body:IUserBody):Promise<IUser> {
    const userId = await getCookie("userId");
    const token = await getCookie("token");
    return apiClient.put<IUser>(`user/${userId}`,body,{
      headers:{
        Authorization:`Bearer ${token}`,
        "x-user":userId
      }
    }).then(({data}:AxiosResponse<IUser>)=>{
      revalidatePath("/main/[id]/profile");
      return data;
    });
  }
}
