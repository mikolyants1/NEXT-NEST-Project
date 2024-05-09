"use server"

import {type Invitation, } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import { cookies } from "next/headers";
import {type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { revalidatePath, revalidateTag } from "next/cache";

export async function delInvite(id:string):Promise<Invitation> {
  const cookieStore:ReadonlyRequestCookies = cookies();
  const token = cookieStore.get("token")?.value;
  const userId = cookieStore.get("userId")?.value;
  const {data} = await apiClient.delete<Invitation>(
   `invitation/${id}?userId=${userId}`,{
      headers:{
        authorization:`Bearer ${token}`
      }
    }
  );
  revalidateTag("adresser");
  return data;
}