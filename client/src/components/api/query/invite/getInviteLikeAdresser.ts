"use server"

import {type Invitation } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import {type AxiosResponse } from "axios";
import { cookies } from "next/headers";

export async function getInviteLikeAdresser():Promise<Invitation[]> {
  const id = cookies().get("userId")?.value;
  return apiClient.get<Invitation[]>(`invitation/adresser/${id}`)
  .then(({data}:AxiosResponse<Invitation[]>)=>data);
}