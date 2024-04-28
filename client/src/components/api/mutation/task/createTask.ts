import { ICommDelBody, ITask, ITaskBody } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import { AxiosResponse } from "axios";

export async function createTask({
  token,userId,title
}:ITaskBody):Promise<ITask> {
  return apiClient.post<ITask>(
  `task?userId=${userId}`,{title},{
    headers:{
      authorization:`Bearer ${token}`
    }
  })
  .then(({data}:AxiosResponse<ITask>)=>data)
}