import { createTask } from "@/components/api/mutation/task/createTask";
import { ITask, Null } from "@/components/libs/types/type";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  setMutTasks:Dispatch<SetStateAction<ITask[]>>
}

export async function setTaskAction({
    setMutTasks
}:IProps,form:FormData):Promise<void> {
  const title:Null<FormDataEntryValue> = form.get("title");
  if (!title) return;
  const data:ITask = await createTask(title);
  setMutTasks((prv:ITask) => ([...prv,data]));
}