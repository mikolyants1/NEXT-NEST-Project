import { IFriend } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import { AxiosResponse } from "axios";

export async function getFriends(id:string):Promise<IFriend[]> {
    return apiClient.get<IFriend[]>(`friend/${id}`)
    .then(({data}:AxiosResponse<IFriend[]>)=>data);
}