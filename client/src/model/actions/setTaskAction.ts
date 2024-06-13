import { taskApiQuery } from "@/api/task/taskApiQuery";
import {type ITask } from "@/libs/types/type";
import {type Dispatch,type SetStateAction } from "react";

interface IProps {
  setMutTasks:Dispatch<SetStateAction<ITask[]>>
}

export async function setTaskAction({
  setMutTasks
}:IProps,form:FormData):Promise<void> {
  const title = form.get("title") as string;
  if (!title) return;
  const data = await taskApiQuery<ITask,string>("create",title);
  setMutTasks((prv:ITask[]) => ([...prv,data]));
}