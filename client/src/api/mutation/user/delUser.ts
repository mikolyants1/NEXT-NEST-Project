"use server"

import {type IUser } from "@/libs/types/type";
import { apiClient } from "../../apiClient";
import {type AxiosResponse } from "axios";
import { getCookie } from "@/model/hooks/useCookie";

export async function delUser():Promise<IUser> {
  const token = getCookie("token");
  const id = getCookie("userId");
  return apiClient.delete<IUser>(`user/${id}`,{
    headers:{
      Authorization:`Bearer ${token}`,
      "x-user":id
    }
  })
  .then(({data}:AxiosResponse<IUser>)=>data);
}