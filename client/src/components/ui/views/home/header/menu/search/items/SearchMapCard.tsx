"use client"

import { IStore, IUser } from "@/components/libs/types/type";
import SearchItemCard from "./item/SearchItemCard";
import { ChangeEvent, useState } from "react";
import { Input } from "@chakra-ui/react";
import { useStore } from "@/components/model/store/store";
import { FriendContext } from "@/components/model/context/friend";

interface IProps {
  users:IUser[]
}

function SearchMapCard({users}:IProps):JSX.Element {
  const [sortUsers,setSortUsers] = useState<IUser[]>([]);
  const {id}:IStore = useStore();

  const change = (e:ChangeEvent<HTMLInputElement>):void => {
    const newUsers = users.filter((u:IUser) => u.id !== id)
    .filter((u:IUser) => u.tag.includes(e.target.value));
    setSortUsers(e.target.value ? newUsers : []);
  }
  
  return (
     <FriendContext.Provider value={false}>
       <Input w="90%"
       bg="rgb(230,230,230)"
       onChange={change}
       placeholder='tag'
      />
      {sortUsers.map((u:IUser):JSX.Element=>(
        <SearchItemCard key={u.id} {...u} />
      ))}
     </FriendContext.Provider>
  );
}

export default SearchMapCard