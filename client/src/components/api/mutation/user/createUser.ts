import { IUser, IUserBody } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import { AxiosResponse } from "axios";

export async function createUser(body:IUserBody):Promise<IUser> {
    return apiClient.post<IUser>("user",body)
    .then(({data}:AxiosResponse<IUser>)=>data);
}