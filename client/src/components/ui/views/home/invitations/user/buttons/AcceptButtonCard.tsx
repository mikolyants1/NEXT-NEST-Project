"use client"

import { actionWithFriend } from '@/components/api/mutation/friend/actionWithFriend'
import { delInvite } from '@/components/api/mutation/invite/delInvite'
import { EFriendAction } from '@/components/libs/enums/enum'
import { IStore } from '@/components/libs/types/type'
import { useStore } from '@/components/model/store/store'
import { Button } from '@chakra-ui/react'
import React from 'react'

interface IProps {
    friendId:string,
    inviteId:string
}
function AcceptButtonCard({friendId,inviteId}:IProps):JSX.Element {
 const {id:userId,token}:IStore = useStore();

  const addNewFriend = async ():Promise<void> => {
    await actionWithFriend({
      action:EFriendAction.ADD,
      friendId,
      userId,
      token
    });
    delInvite({
      inviteId,
      token,
      userId
    });
  }

  return (
    <Button
     onClick={addNewFriend}
     colorScheme="green">
      accept
    </Button>
  )
}

export default AcceptButtonCard