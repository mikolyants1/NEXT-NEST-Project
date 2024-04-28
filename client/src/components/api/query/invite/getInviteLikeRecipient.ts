import { INotification, Invitation } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import { AxiosResponse } from "axios";

export async function getInviteLikeRecipient(id:string):Promise<Invitation[]> {
    return apiClient.get<Invitation[]>(`invitation/recipient/${id}`)
    .then(({data}:AxiosResponse<Invitation[]>)=>data);
}