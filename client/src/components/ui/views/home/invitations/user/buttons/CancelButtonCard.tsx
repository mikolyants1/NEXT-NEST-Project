"use client"

import { delInvite } from "@/components/api/mutation/invite/delInvite"
import { Button } from "@chakra-ui/react";

interface IProps {
  id:string
}

function CancelButtonCard({id}:IProps):JSX.Element {
  return (
    <Button colorScheme="red"
     onClick={() => delInvite(id)}>
      cancel
    </Button>
  )
}

export default CancelButtonCard