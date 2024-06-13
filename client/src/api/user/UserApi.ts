
import { IUser, IUserBody } from "@/libs/types/type";
import { apiClient } from "../apiClient";
import { AxiosResponse } from "axios";
import { revalidatePath } from "next/cache";
import { getCookie } from "@/model/hooks/getCookie";

export class UserApi {
  async find():Promise<IUser[]> {
    return apiClient.get<IUser[]>("user")
    .then(({data}:AxiosResponse<IUser[]>) => data);
  }

  async findById(id:string):Promise<IUser> {
    return apiClient.get<IUser>(`user/${id}`)
    .then(({data}:AxiosResponse<IUser>) => data);
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
