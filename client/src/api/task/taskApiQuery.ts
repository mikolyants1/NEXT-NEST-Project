"use server"

import { TaskApi } from "../../api/task/TaskApi";

export const taskApiQuery = async <T,A>(
  key:keyof TaskApi,
  arg?:A
):Promise<T> => {
  const api = new TaskApi();
  const func = api[key] as (arg?:A) => Promise<T>;
  return func.call(api,arg);
}