"use server"


import { FriendApi } from "./FriendApi";

export const friendApiQuery = async <T,A>(
  key:keyof FriendApi,
  arg?:A
):Promise<T> => {
  const api = new FriendApi();
  const func = api[key] as (arg?:A) => Promise<T>;
  return func.call(api,arg);
}

