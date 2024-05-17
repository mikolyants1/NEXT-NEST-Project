"use server"

import {type IUser } from "@/libs/types/type";
import { apiClient } from "../../apiClient";
import {type AxiosResponse } from "axios";
import { cookies } from "next/headers";
import {type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export async function delUser():Promise<IUser> {
  const cookieStore:ReadonlyRequestCookies = cookies();
  const token = cookieStore.get("token")?.value;
  const id = cookieStore.get("userId")?.value;
    return apiClient.delete<IUser>(`user/${id}`,{
      headers:{
        authorization:`Bearer ${token}`,
        "x-user":id
      }
    })
    .then(({data}:AxiosResponse<IUser>)=>data);
}