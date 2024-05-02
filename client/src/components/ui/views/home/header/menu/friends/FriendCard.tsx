"use client"
import { IUser } from "@/components/libs/types/type";
import { FriendContext } from "@/components/model/context/friend";
import SearchItemCard from "../search/items/item/SearchItemCard";
import { getFriendUsers } from "@/components/model/functions/compare/friendUsers"
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/ui/load/Loading";
import Error from "@/components/ui/load/Error";

function FriendCard():JSX.Element {
  const {data,isError,isLoading} = useQuery<IUser[]>({
    queryKey:["friends"],
    queryFn:() => getFriendUsers()
  });

  if (isLoading) return <Loading />;
  if (isError || !data) return <Error />;

  return (
    <FriendContext.Provider value={true}>
      {data.map((u:IUser):JSX.Element => (
        <SearchItemCard key={u.id} {...u} />
      ))}
    </FriendContext.Provider>
  )
}

export default FriendCard