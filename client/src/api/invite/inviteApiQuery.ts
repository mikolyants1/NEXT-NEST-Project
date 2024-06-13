"use server"

import { InviteApi } from "@/api/invite/InviteApi";

export const inviteApiQuery = async <T,A>(
  key:keyof InviteApi,
  arg?:A
):Promise<T> => {
  const api = new InviteApi();
  const func = api[key] as (arg?:A) => Promise<T>;
  return func.call(api,arg);
}