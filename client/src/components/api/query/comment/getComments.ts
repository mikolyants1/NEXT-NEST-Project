import { IComment } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import { AxiosResponse } from "axios";

export async function getTaskComments(id:string):Promise<IComment[]> {
    return apiClient.get<IComment[]>(`comments/${id}`)
    .then(({data}:AxiosResponse<IComment[]>)=>data);
}