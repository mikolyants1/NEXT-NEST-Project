import { ICheckBody, ICheckRes } from "@/components/libs/types/type";
import { apiClient } from "../../apiClient";
import { AxiosResponse } from "axios";

export async function checkUser(body:ICheckBody):Promise<ICheckRes> {
    return apiClient.post<ICheckRes>("user/check",body)
    .then(({data}:AxiosResponse<ICheckRes>)=>data);
}