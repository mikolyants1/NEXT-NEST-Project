"use client"

import { FriendContext } from '@/model/context/friend';
import { Input } from '@chakra-ui/react';
import SearchItemCard from './items/item/SearchItemCard';
import {type IUser } from '@/libs/types/type';
import { getUsersByTag } from '@/model/functions/find/getUsersByTag';
import {type ChangeEvent, startTransition, useState } from 'react';

export default function SearchCard():JSX.Element {
  const [sortUsers,setSortUsers] = useState<IUser[]>([]);

  const change = async (e:ChangeEvent<HTMLInputElement>):Promise<void> => {
    const users:IUser[] = await getUsersByTag(e.target.value);
    startTransition(() => {
      setSortUsers(e.target.value ? users : []);
    });
  }
  
  return (
    <div className="w-[100%] justify-center items-center flex-col flex overflow-scroll h-[100%]">
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

    </div>
  )
}
