"use server"

import { EInvite } from "@/libs/enums/enum";
import type { Invitation } from "@/libs/types/type";
import { getCookie } from "@/model/hooks/getCookie";

export async function getInvite(type:EInvite):Promise<Invitation[]> {
  const id = getCookie("userId");
  return fetch(`http://localhost:5000/invitation/${id}?type=${type}`,{
    method:"GET",
    next:{
      revalidate:3600,
      tags:["invite"]
    }
  })
  .then((res) => res.json());
}