import { IFriend, IFriendBody } from "@/libs/types";
import { AxiosResponse } from "axios";
import { apiClient } from "../apiClient";
import { revalidatePath } from "next/cache";
import { getCookie } from "@/model/hooks/getCookie";
import { z } from "zod";
import { FriendSchema } from "@/libs/zod/data";
import { FriendDeleteOrCreateBodySchema } from "@/libs/zod/params";

export class FriendApi {
  async find(id:string):Promise<IFriend[]> {
    const {data} = await apiClient.get<IFriend[]>(`friend/${id}`);
    const map_schema = z.array(FriendSchema);
    return map_schema.parse(data);
  }

  async deleteOrCreate(body:IFriendBody):Promise<IFriend>{
    const token = await getCookie("token");
    const userId = await getCookie("userId");
    revalidatePath("/main","layout");
    const parse_body = FriendDeleteOrCreateBodySchema.parse(body);
    return apiClient.post<IFriend>(`friend`,parse_body,{
      headers:{
        Authorization:`Bearer ${token}`,
        "x-user":userId
      }
    })
    .then(({data}:AxiosResponse<IFriend>) => data);
  }
}