"use client"

import { FriendContext } from '@/components/model/context/friend';
import { Flex, Input } from '@chakra-ui/react';
import SearchItemCard from './items/item/SearchItemCard';
import { IUser } from '@/components/libs/types/type';
import { getUsersByTag } from '@/components/model/functions/find/getUsersByTag';
import { ChangeEvent, startTransition, useState } from 'react';

function SearchCard():JSX.Element {
  const [sortUsers,setSortUsers] = useState<IUser[]>([]);

  const change = async (e:ChangeEvent<HTMLInputElement>):Promise<void> => {
    const newUsers = await getUsersByTag(e.target.value);
    startTransition(() => {
      setSortUsers(e.target.value ? newUsers : []);
    });
  }
  
  return (
    <Flex w="100%"
     justifyContent="center"
     alignItems="center"
     flexDir="column"
     overflowY="scroll"
     h="100%">
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

    </Flex>
  )
}

export default SearchCard