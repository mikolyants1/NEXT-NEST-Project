"use client"

import { friendApiQuery } from '@/api/friend/friendApiQuery'
import { inviteApiQuery } from '@/api/invite/inviteApiQuery'
import { EFriendAction } from '@/libs/enums/enum'
import { IFriend, IFriendBody, Invitation } from '@/libs/types/type'
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
    inviteApiQuery<Invitation,string>("remove",inviteId);
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