import { AuthApi } from "./AuthApi";

export const authApiQuery = async <T,A>(
  key:keyof AuthApi,
  arg?:A
):Promise<T> => {
  const api = new AuthApi();
  const func = api[key] as (arg?:A) => Promise<T>;
  return func.call(api,arg);
}