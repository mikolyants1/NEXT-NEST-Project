import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers"

export const getCookie = (key:string):string => {
  const cookie:ReadonlyRequestCookies = cookies();
  return cookie.get(key)?.value || "";
}