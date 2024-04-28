import { IUser } from "@/components/libs/types/type";
import { FriendContext } from "@/components/model/context/friend";
import SearchItemCard from "../search/items/item/SearchItemCard";
import { getFriendUsers } from "@/components/model/functions/compare/friendUsers";

interface IProps {
  id:string
}

async function FriendCard({id}:IProps):Promise<JSX.Element> {
  const users:IUser[] = await getFriendUsers(id);

  return (
    <FriendContext.Provider value={true}>
      {users.map((u:IUser):JSX.Element => (
        <SearchItemCard key={u.id} {...u} />
      ))}
    </FriendContext.Provider>
  )
}

export default FriendCard