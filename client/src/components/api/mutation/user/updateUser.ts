import { IUser, IUserUpdateBody } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import { AxiosResponse } from "axios";

export async function updateUser({
    id,token,...body
}:IUserUpdateBody):Promise<IUser> {
    return apiClient.put(`user/${id}?userId=${id}`,body,{
      headers:{
        authorization:`Bearer ${token}`
      }
    })
    .then(({data}:AxiosResponse<IUser>)=>data);
}