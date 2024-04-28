import { INotCreareBody, Invitation } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import { AxiosResponse } from "axios";

export async function createInvite({
 userId,token,...body
}:INotCreareBody):Promise<Invitation> {
  return apiClient.post<Invitation>(
    `invitation?userId=${userId}`,body,{
      headers:{
        authorization:`Bearer ${token}`
      }
    }
  )
  .then(({data}:AxiosResponse<Invitation>)=>data);
}