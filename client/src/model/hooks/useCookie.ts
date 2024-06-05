import { cookies } from "next/headers"

export const getCookie = (field:string):string => {
  const cookie = cookies();
  return cookie.get(field)?.value || "";
}