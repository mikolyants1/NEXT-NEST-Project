import { Invitation } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import { AxiosResponse } from "axios";

export async function getInviteLikeAdresser(id:string):Promise<Invitation[]> {
    return apiClient.get<Invitation[]>(`invitation/adresser/${id}`)
    .then(({data}:AxiosResponse<Invitation[]>)=>data);
}