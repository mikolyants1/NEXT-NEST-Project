"use server"

import { Invitation } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import { AxiosResponse } from "axios";
import { cookies } from "next/headers";

export async function getInviteLikeRecipient():Promise<Invitation[]> {
  const id = cookies().get("userId")?.value;
  return apiClient.get<Invitation[]>(`invitation/recipient/${id}`)
  .then(({data}:AxiosResponse<Invitation[]>) => data);
}