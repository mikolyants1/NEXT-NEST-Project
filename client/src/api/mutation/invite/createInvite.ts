"use server"

import {type Invitation } from "@/libs/types/type";
import { cookies } from "next/headers";
import {type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { revalidateTag } from "next/cache";
import { getCookie } from "@/model/hooks/useCookie";

export async function createInvite(recipient:string):Promise<Invitation> {
  const token = getCookie("token");
  const userId = getCookie("userId");
  const data = await fetch(`http://localhost:5000/invitation`,{
      method:"POST",
      headers:{
        "Content-type":"application/json",
        Authorization:`Bearer ${token}`,
        "x-user":userId || ""
      },
      body:JSON.stringify({recipient}),
      cache:"force-cache",
      next:{
        revalidate:3600
      }
    }
  );
  revalidateTag("invite");
  return data.json();
}