"use server"

import { UserApi } from "../../api/user/UserApi"

export const userApiQuery = async <T,A>(
  key:keyof UserApi,
  arg?:A
):Promise<T> => {
  const api = new UserApi();
  const func = api[key] as (arg?:A) => Promise<T>;
  return func.call(api,arg);
}