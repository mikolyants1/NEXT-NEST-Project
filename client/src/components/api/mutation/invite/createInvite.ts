"use server"

import {type Invitation } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import {type AxiosResponse } from "axios";
import { cookies } from "next/headers";
import {type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export async function createInvite(recipient:string):Promise<Invitation> {
  const cookieStore:ReadonlyRequestCookies = cookies();
  const token = cookieStore.get("token")?.value;
  const userId = cookieStore.get("userId")?.value;
  return apiClient.post<Invitation>(
    `invitation?userId=${userId}`,{recipient},{
      headers:{
        authorization:`Bearer ${token}`
      }
    }
  )
  .then(({data}:AxiosResponse<Invitation>)=>data);
}