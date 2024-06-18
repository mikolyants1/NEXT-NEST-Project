"use client"

import { IUser } from "@/libs/types";
import { FriendContext } from "@/model/context/friend";
import SearchItemCard from "../search/items/item/SearchItemCard";
import { getFriendUsers } from "@/model/functions/compare/friendUsers"
import { useQuery } from "@tanstack/react-query";
import Loading from "@/ui/load/Loading";
import Error from "@/ui/load/Error";

export default function FriendCard():JSX.Element {
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
  );
}
