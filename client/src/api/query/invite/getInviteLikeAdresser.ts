"use server"

import type { Invitation } from "@/libs/types/type";
import { getCookie } from "@/model/hooks/useCookie";
import { cookies } from "next/headers";

export async function getInviteLikeAdresser():Promise<Invitation[]> {
  const id = getCookie("userId");
  return fetch(`http://localhost:5000/invitation/adresser/${id}`,{
    method:"GET",
    cache:"force-cache",
    next:{
      revalidate:3600,
      tags:["adresser"]
    }
  })
  .then((res) => res.json());
}