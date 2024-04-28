"use client"

import { IUser } from '@/components/libs/types/type'
import { Box, Flex } from '@chakra-ui/react';
import LogoCard from '../../../../title/cards/logo/LogoCard';
import SetUserCard from './action/SetUserCard';
import { MouseEvent, useContext, useState } from 'react';
import { FriendContext } from '@/components/model/context/friend';

function SearchItemCard({username,id}:IUser):JSX.Element {
  const isFriend = useContext<boolean>(FriendContext);
  const [show,setShow] = useState<boolean>(false);

  const hover = (e:MouseEvent<HTMLDivElement>):void => {
    setShow(e.type == "mouseover");
  }
  return (
    <Flex w="90%" mt={2}
     justifyContent="space-between"
     alignItems="center" gap={2}
     onMouseOver={hover}
     onMouseOut={hover}>
      <Flex alignItems="center"
       columnGap={2}>
       <LogoCard
        username={username}
        allow={isFriend}
        isHeader={false}
        id={id}
        size='xs'
        />
       <Box>{username}</Box>
      </Flex>
      {show&&<SetUserCard friendId={id} />}
    </Flex>
  )
}

export default SearchItemCard