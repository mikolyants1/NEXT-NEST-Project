import { EInvite } from "@/components/libs/enums/enum";
import { getUser } from "@/components/api/query/user/getUser"
import {type IUser,type Invitation } from "@/components/libs/types/type"
import { Box, Flex } from "@chakra-ui/react";
import CancelButtonCard from "./buttons/CancelButtonCard";
import AcceptButtonCard from "./buttons/AcceptButtonCard";
import LogoCard from "../../header/title/cards/logo/LogoCard";

interface IProps extends Invitation {
    role:EInvite
 }
 
async function UserInviteCard({id,recipient,addresser,role}:IProps):Promise<JSX.Element> {
  const inviteUserId:string = role == EInvite.ADRESSER ? recipient : addresser;
  const user:IUser = await getUser(inviteUserId);

  return (
    <Flex w={300} mt={10}
     bg="rgb(90,90,90)"
     boxSizing="border-box"
     borderRadius={10}
     flexDir="column"
     justifyContent='center'
     alignItems="center"
     color="white" pt={2}>
      <LogoCard size="xl"
       username={user.username}
       allow={false}
      />
      <Box mt={5} w="100%"
       textAlign="center"
       fontSize={20} mb={2}>
        {role == EInvite.ADRESSER
        ? `you sent invite to ${user.username}`
        : `${user.username} want's to be your friend`}
      </Box>
      <Flex w="100%"
       justifyContent='center'
       alignItems='center'
       gap={10} mb={1}>
         <CancelButtonCard id={id} />
         {role == EInvite.RECIPIENT && (
           <AcceptButtonCard
            friendId={addresser}
            inviteId={id}
           />
         )}
      </Flex>
    </Flex>
  )
}

export default UserInviteCard