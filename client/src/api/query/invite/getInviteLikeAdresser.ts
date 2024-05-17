"use server"

import type { Invitation } from "@/components/libs/types/type";
import { cookies } from "next/headers";

export async function getInviteLikeAdresser():Promise<Invitation[]> {
  const id = cookies().get("userId")?.value;
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