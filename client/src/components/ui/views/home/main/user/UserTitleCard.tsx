"use client"

import { IStore } from "@/components/libs/types/type"
import { useStore } from "@/components/model/store/store"
import { Box } from "@chakra-ui/react";

interface IProps {
  userId:string,
  username:string
}
function UserTitleCard({userId,username}:IProps):JSX.Element {
  const {id}:IStore = useStore();
  
  return (
    <Box fontSize={30}
     fontWeight="bold">
      {`${id == userId ? "Your" : username}'s `}
      task list
    </Box>
  )
}

export default UserTitleCard