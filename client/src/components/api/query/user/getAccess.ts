import { IAccessBody } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import { AxiosResponse } from "axios";

export async function getAccess({
    id,...body
}:IAccessBody):Promise<boolean>{
  return apiClient.post<boolean>(`user/access/${id}`,body)
  .then(({data}:AxiosResponse<boolean>)=>data);
}