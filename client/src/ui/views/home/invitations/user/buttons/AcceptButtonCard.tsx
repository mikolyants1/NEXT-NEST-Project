"use client"

import { friendApiQuery } from '@/api/friend/friendApiQuery'
import { actionWithFriend } from '@/api/mutation/friend/actionWithFriend'
import { delInvite } from '@/api/mutation/invite/delInvite'
import { EFriendAction } from '@/libs/enums/enum'
import { IFriend, IFriendBody } from '@/libs/types/type'
import { Button } from '@chakra-ui/react'

interface IProps {
  friendId:string,
  inviteId:string
}

function AcceptButtonCard({friendId,inviteId}:IProps):JSX.Element {
  const addNewFriend = async ():Promise<void> => {
    await friendApiQuery<IFriend,IFriendBody>(
      "deleteOrCreate",{
      action:EFriendAction.ADD,
      friendId
    });
    delInvite(inviteId);
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