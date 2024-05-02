"use client"

import { delInvite } from "@/components/api/mutation/invite/delInvite"
import { Button } from "@chakra-ui/react";

interface IProps {
  id:string
}
function CancelButtonCard({id}:IProps):JSX.Element {
 const cancelInvite = ():void => {
    delInvite(id);
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