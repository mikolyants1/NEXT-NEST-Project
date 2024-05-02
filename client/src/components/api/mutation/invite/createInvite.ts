"use server"

import {type Invitation } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import { cookies } from "next/headers";
import {type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { revalidatePath } from "next/cache";

export async function createInvite(recipient:string):Promise<Invitation> {
  const cookieStore:ReadonlyRequestCookies = cookies();
  const token = cookieStore.get("token")?.value;
  const userId = cookieStore.get("userId")?.value;
  const {data} = await apiClient.post<Invitation>(
    `invitation?userId=${userId}`,{recipient},{
      headers:{
        authorization:`Bearer ${token}`
      }
    }
  );
  revalidatePath("/invitation/[id]","page");
  revalidatePath("/main","layout");
  return data;
}