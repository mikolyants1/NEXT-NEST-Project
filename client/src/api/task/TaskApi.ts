
import { ITask, ITaskUpdateBody } from "@/libs/types";
import { AxiosResponse } from "axios";
import { apiClient } from "../apiClient";
import { getCookie } from "@/model/hooks/getCookie";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { TaskSchema } from "@/libs/zod/data";
import { TaskUpdateBodySchema } from "@/libs/zod/params";

export class TaskApi {
  async find(id:string):Promise<ITask[]> {
    const {data} = await apiClient.get<ITask[]>(`task/user/${id}`);
    const map_schema = z.array(TaskSchema);
    return map_schema.parse(data);
  }

  async findById(id:string):Promise<ITask> {
    const {data} = await apiClient.get<ITask>(`task/${id}`);
    return TaskSchema.parse(data);
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

  async update(body:ITaskUpdateBody):Promise<ITask> {
    const userId = await getCookie("userId");
    const token = await getCookie("token");
    const { taskId, title } = TaskUpdateBodySchema.parse(body);
    return apiClient.put<ITask>(`task/${taskId}`,{title},{
      headers:{
        Authorization:`Bearer ${token}`,
        "x-user":userId
      }
    })
    .then(({data}:AxiosResponse<ITask>) => data)
  }
}
