"use server"

import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers"

export const getCookie = async (key:string):Promise<string> => {
  const cookie:ReadonlyRequestCookies = cookies();
  return cookie.get(key)?.value || "";
}