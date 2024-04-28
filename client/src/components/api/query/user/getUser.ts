import { IUser } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import { AxiosResponse } from "axios";

export async function getUser(id:string):Promise<IUser> {
    return apiClient.get<IUser>(`user/get_one/${id}`)
    .then(({data}:AxiosResponse<IUser>)=>data);
}