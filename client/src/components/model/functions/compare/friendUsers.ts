import { getFriends } from "@/components/api/query/friend/getFriend";
import { getUsers } from "@/components/api/query/user/getUsers";
import { IFriend, IUser } from "@/components/libs/types/type"

export const getFriendUsers = async (id:string):Promise<IUser[]> => {
  const friends:IFriend[] = await getFriends(id);
  const users:IUser[] = await getUsers();
  return users.filter((u:IUser) => (
     friends.some((f:IFriend) => f.friend_id == u.id)
  ));
}