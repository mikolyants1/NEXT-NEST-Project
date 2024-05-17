import {type IFriend } from "@/libs/types/type";
import { apiClient } from "../../apiClient";
import {type AxiosResponse } from "axios";

export async function getFriends(id:string):Promise<IFriend[]> {
   return apiClient.get<IFriend[]>(`friend/${id}`)
   .then(({data}:AxiosResponse<IFriend[]>)=>data);
}