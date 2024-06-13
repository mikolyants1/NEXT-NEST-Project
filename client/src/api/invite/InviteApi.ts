import { Invitation } from "@/libs/types/type";
import { getCookie } from "@/model/hooks/getCookie";
import { apiClient } from "../apiClient";
import { revalidateTag } from "next/cache";
import { AxiosResponse } from "axios";
import { EInvite } from "@/libs/enums/enum";

export class InviteApi {
  async find(type:EInvite):Promise<Invitation[]> {
    const id = await getCookie("userId");
    return fetch(`http://localhost:5000/invitation/${id}?type=${type}`,{
      method:"GET",
      next:{
        revalidate:3600,
        tags:["invite"]
      }
    }).then((res) => res.json());
  }
  
  async create(recipient:string):Promise<Invitation> {
    const token = await getCookie("token");
    const userId = await getCookie("userId");
    const data = await fetch(`http://localhost:5000/invitation`,{
      method:"POST",
      headers:{
        "Content-type":"application/json",
        Authorization:`Bearer ${token}`,
        "x-user":userId || ""
      },
      body:JSON.stringify({recipient}),
      cache:"force-cache",
      next:{
        revalidate:3600
      }
    });
    revalidateTag("invite");
    return data.json();
  }

  async remove(id:string):Promise<Invitation> {
    const token = await getCookie("token");
    const userId = await getCookie("userId");
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
}