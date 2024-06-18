"use client"

import { inviteApiQuery } from "@/api/invite/inviteApiQuery"
import { Invitation } from "@/libs/types"
import { Button } from "@chakra-ui/react"

interface IProps {
  id:string
}

function CancelButtonCard({id}:IProps):JSX.Element {
  const delInvite = async () => {
    inviteApiQuery<Invitation,string>("remove",id);
  }

  return (
    <Button colorScheme="red"
     onClick={delInvite}>
      cancel
    </Button>
  )
}

export default CancelButtonCard