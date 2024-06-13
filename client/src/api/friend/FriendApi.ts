import { IFriend, IFriendBody } from "@/libs/types/type";
import { AxiosResponse } from "axios";
import { apiClient } from "../apiClient";
import { revalidatePath } from "next/cache";

export class FriendApi {
  async find(id:string):Promise<IFriend[]> {
    return apiClient.get<IFriend[]>(`friend/${id}`)
    .then(({data}:AxiosResponse<IFriend[]>)=>data);
  }

  async deleteOrCreate(body:IFriendBody):Promise<IFriend>{
    const token = await getCookie("token");
    const userId = await getCookie("userId");
    revalidatePath("/main","layout");
    return apiClient.post<IFriend>(`friend`,body,{
      headers:{
        Authorization:`Bearer ${token}`,
        "x-user":userId
      }
    })
    .then(({data}:AxiosResponse<IFriend>) => data);
  }
}