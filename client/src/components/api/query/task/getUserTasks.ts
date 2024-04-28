import { ITask } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import { AxiosResponse } from "axios";

export async function getUserTasks(id:string):Promise<ITask[]> {
    return apiClient.get<ITask[]>(`task/user/${id}`)
    .then(({data}:AxiosResponse<ITask[]>)=>data);
}