import type { IUser } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import type { AxiosResponse } from "axios";

export async function getUsers():Promise<IUser[]> {
    return apiClient.get<IUser[]>("user")
    .then(({data}:AxiosResponse<IUser[]>)=>data);
}