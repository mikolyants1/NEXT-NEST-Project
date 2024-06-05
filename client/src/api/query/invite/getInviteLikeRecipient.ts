"use server"

import type { Invitation } from "@/libs/types/type";
import { getCookie } from "@/model/hooks/useCookie";
import { cookies } from "next/headers";

export async function getInviteLikeRecipient():Promise<Invitation[]> {
  const id = getCookie("userId");
  return fetch(`http://localhost:5000/invitation/recipient/${id}`,{
    method:"GET",
    next:{
      revalidate:3600,
      tags:["recipient"]
    }
  })
  .then((res) => res.json());
}