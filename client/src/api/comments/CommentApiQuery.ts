import { CommentApi } from "./CommentApi";

export const commentApiQuery = async <T,A>(
  key:keyof CommentApi,
  arg?:A
):Promise<T> => {
  const api = new CommentApi();
  const func = api[key] as (arg?:A) => Promise<T>;
  return func.call(api,arg);
}