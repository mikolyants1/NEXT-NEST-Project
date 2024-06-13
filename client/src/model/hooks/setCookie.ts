"use server"

import { cookies } from "next/headers"

export const setCookie = async <T>(
    key:string,
    value:T
):Promise<void> => {
  cookies().set(key,value);
}