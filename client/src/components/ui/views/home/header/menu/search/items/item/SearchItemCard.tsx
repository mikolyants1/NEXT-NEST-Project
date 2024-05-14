"use client"

import { IUser } from '@/components/libs/types/type'
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
    <div className="flex w-[90%] mt-4 justify-between items-center gap-2"
     onMouseOver={hover}
     onMouseOut={hover}>
      <div className="flex items-center gap-x-2">
       <LogoCard
        username={username}
        allow={isFriend}
        isHeader={false}
        id={id}
        size='xs'
        />
       <div>{username}</div>
      </div>
      {show && <SetUserCard id={id} />}
    </div>
  )
}

export default SearchItemCard