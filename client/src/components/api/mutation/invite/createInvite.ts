"use server"

import {type Invitation } from "@/components/libs/types/type";
import { cookies } from "next/headers";
import {type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createInvite(recipient:string):Promise<Invitation> {
  const cookieStore:ReadonlyRequestCookies = cookies();
  const token = cookieStore.get("token")?.value;
  const userId = cookieStore.get("userId")?.value;
  const data = await fetch(
  `http://localhost:5000/invitation?userId=${userId}`,{
      method:"POST",
      headers:{
        "Content-type":"application/json",
        authorization:`Bearer ${token}`
      },
      body:JSON.stringify({recipient}),
      cache:"force-cache",
      next:{
        revalidate:3600
      }
    }
  );
  revalidateTag("adresser")
  return data.json();
}