import { createTask } from "@/api/mutation/task/createTask";
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
  const data:ITask = await createTask(title);
  setMutTasks((prv:ITask[]) => ([...prv,data]));
}