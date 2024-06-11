"use server"

import {type Invitation } from "@/libs/types/type";
import { apiClient } from "../../apiClient";
import { revalidateTag } from "next/cache";
import {type AxiosResponse } from "axios";
import { getCookie } from "@/model/hooks/getCookie";

export async function delInvite(id:string):Promise<Invitation> {
  const token = getCookie("token");
  const userId = getCookie("userId");
  return apiClient.delete<Invitation>(`invitation/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`,
        "x-user":userId
      }
    }
  ).then(({data}:AxiosResponse<Invitation>) => {
    revalidateTag("invite");
    return data;
  });
}