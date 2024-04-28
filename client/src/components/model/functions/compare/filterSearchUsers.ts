import { IUser } from "@/components/libs/types/type";

interface IArgs {
    users:IUser[],
    userId:string,
}
export const filterSearchUsers = ({
    userId,users
}:IArgs):IUser[] => {
  return users
  .filter((u:IUser) => u.id !== userId)
}