
import { ITask, ITaskUpdateBody } from "@/libs/types/type";
import { AxiosResponse } from "axios";
import { apiClient } from "../apiClient";
import { getCookie } from "@/model/hooks/getCookie";
import { revalidatePath } from "next/cache";

export class TaskApi {
  async find(id:string):Promise<ITask[]> {
    return apiClient.get<ITask[]>(`task/user/${id}`)
    .then(({data}:AxiosResponse<ITask[]>) => data);
  }

  async findById(id:string):Promise<ITask> {
    return apiClient.get<ITask>(`task/${id}`)
    .then(({data}:AxiosResponse<ITask>)=>data);
  }
  
  async create(title:string):Promise<ITask> {
    const userId = await getCookie("userId");
    const token = await getCookie("token");
    return apiClient.post<ITask>("task",{title},{
      headers:{
        Authorization:`Bearer ${token}`,
        "x-user":userId
      }
    }).then(({data}:AxiosResponse<ITask>) => data);
  }

  async remove(id:string):Promise<ITask> {
    const userId = await getCookie("userId");
    const token = await getCookie("token");
    revalidatePath("/main/[id]","page");
    return apiClient.delete<ITask>(`task/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`,
        "x-user":userId
      }
    }).then(({data}:AxiosResponse<ITask>) => data);
  }

  async update({taskId,title}:ITaskUpdateBody):Promise<ITask> {
    const userId = await getCookie("userId");
    const token = await getCookie("token");
    return apiClient.put<ITask>(`task/${taskId}`,{title},{
      headers:{
        Authorization:`Bearer ${token}`,
        "x-user":userId
      }
    })
    .then(({data}:AxiosResponse<ITask>) => data)
  }
}
