import { ITask, ITaskUpdateBody } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import { AxiosResponse } from "axios";

export async function updateTask({
  taskId,token,userId,title
}:ITaskUpdateBody):Promise<ITask> {
  return apiClient.put<ITask>(
  `task/${taskId}?userId=${userId}`,{title},{
    headers:{
      authorization:`Bearer ${token}`
    }
  })
  .then(({data}:AxiosResponse<ITask>)=>data)
}