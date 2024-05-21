"use server"

import {type Invitation } from "@/libs/types/type";
import { apiClient } from "../../apiClient";
import { cookies } from "next/headers";
import {type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { revalidateTag } from "next/cache";
import {type AxiosResponse } from "axios";

export async function delInvite(id:string):Promise<Invitation> {
  const cookieStore:ReadonlyRequestCookies = cookies();
  const token = cookieStore.get("token")?.value;
  const userId = cookieStore.get("userId")?.value;
  return apiClient.delete<Invitation>(`invitation/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`,
        "x-user":userId
      }
    }
  ).then(({data}:AxiosResponse<Invitation>) => {
    revalidateTag("adresser");
    return data;
  });
}