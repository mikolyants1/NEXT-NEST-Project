"use client"

import { actionWithFriend } from '@/components/api/mutation/friend/actionWithFriend'
import { delInvite } from '@/components/api/mutation/invite/delInvite'
import { EFriendAction } from '@/components/libs/enums/enum'
import { Button } from '@chakra-ui/react'

interface IProps {
  friendId:string,
  inviteId:string
}

function AcceptButtonCard({friendId,inviteId}:IProps):JSX.Element {
  const addNewFriend = async ():Promise<void> => {
    await actionWithFriend({
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