"use client"

import { delInvite } from "@/components/api/mutation/invite/delInvite"
import { IStore } from "@/components/libs/types/type";
import { useStore } from "@/components/model/store/store";
import { Button } from "@chakra-ui/react";

interface IProps {
  id:string
}
function CancelButtonCard({id}:IProps):JSX.Element {
 const {token,id:userId}:IStore = useStore();

 const cancelInvite = ():void => {
    delInvite({token,userId,inviteId:id});
 }
  return (
    <Button
     onClick={cancelInvite}
     colorScheme="red">
      cancel
    </Button>
  )
}

export default CancelButtonCard