"use server"

import {type Invitation } from "@/libs/types/type";
import { cookies } from "next/headers";
import {type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { revalidateTag } from "next/cache";

export async function createInvite(recipient:string):Promise<Invitation> {
  const cookieStore:ReadonlyRequestCookies = cookies();
  const token = cookieStore.get("token")?.value;
  const userId = cookieStore.get("userId")?.value;
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
  revalidateTag("adresser");
  return data.json();
}