import { Invitation, InviteBody } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import { AxiosResponse } from "axios";

export async function delInvite({
 token,inviteId,userId
}:InviteBody):Promise<Invitation> {
  return apiClient.delete<Invitation>(
    `invitation/${inviteId}?userId=${userId}`,{
      headers:{
        authorization:`Bearer ${token}`
      }
    }
  )
  .then(({data}:AxiosResponse<Invitation>)=>data);
}