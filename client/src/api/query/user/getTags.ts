import type { AxiosResponse } from "axios";
import { apiClient } from "../../apiClient";

export async function getTags():Promise<string[]> {
  return apiClient.get<string[]>("user/tags")
  .then(({data}:AxiosResponse<string[]>) => data);
}