import { ITaskDelBody, ITask } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import { AxiosResponse } from "axios";

export async function delTask({
  taskId,token,userId
}:ITaskDelBody):Promise<ITask> {
  return apiClient.delete<ITask>(
  `task/${taskId}?userId=${userId}`,{
    headers:{
      authorization:`Bearer ${token}`
    }
  })
  .then(({data}:AxiosResponse<ITask>)=>data)
}