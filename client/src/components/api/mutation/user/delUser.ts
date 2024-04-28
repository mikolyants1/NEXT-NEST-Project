import { IUser } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import { AxiosResponse } from "axios";

export async function delUser(id:string,token:string):Promise<IUser> {
    return apiClient.delete<IUser>(`user/${id}?userId=${id}`,{
      headers:{
        authorization:`Bearer ${token}`
      }
    })
    .then(({data}:AxiosResponse<IUser>)=>data);
}