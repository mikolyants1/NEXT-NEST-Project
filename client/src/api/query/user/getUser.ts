import type { IUser } from "@/libs/types/type";
import { apiClient } from "../../apiClient";
import type{ AxiosResponse } from "axios";

export async function getUser(id:string):Promise<IUser> {
  return apiClient.get<IUser>(`user/${id}`)
  .then(({data}:AxiosResponse<IUser>)=>data);
}