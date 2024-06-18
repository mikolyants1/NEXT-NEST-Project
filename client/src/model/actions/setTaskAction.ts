import { taskApiQuery } from "@/api/task/taskApiQuery";
import {type ITask } from "@/libs/types";

interface IProps {
  createTask:(task:ITask) => void
}

export async function setTaskAction({
  createTask
}:IProps,form:FormData):Promise<void> {
  const title = form.get("title") as string;
  if (!title) return;
  const data = await taskApiQuery<ITask,string>("create",title);
  createTask(data);
}