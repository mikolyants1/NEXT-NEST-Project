import { IFriend, IFriendBody } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import { AxiosResponse } from "axios";

export async function actionWithFriend({
  userId,token,...body
}:IFriendBody):Promise<IFriend>{
  return apiClient.post<IFriend>(`friend?userId=${userId}`,body,{
    headers:{
      authorization:`Bearer ${token}`
    }
  })
  .then(({data}:AxiosResponse<IFriend>)=>data)
}