"use server"

import { EInvite } from "@/libs/enums/enum";
import { getUser } from "@/api/query/user/getUser"
import {type IUser,type Invitation } from "@/libs/types/type"
import AcceptButtonCard from "./buttons/AcceptButtonCard";
import LogoCard from "../../header/title/cards/logo/LogoCard";
import { Button } from "@chakra-ui/react";
import { delInvite } from "@/api/mutation/invite/delInvite";
import CancelButtonCard from "./buttons/CancelButtonCard";

interface IProps extends Invitation {
  role:EInvite
 }
 
async function UserInviteCard({id,recipient,addresser,role}:IProps):Promise<JSX.Element> {
  const inviteUserId:string = role == EInvite.ADRESSER ? recipient : addresser;
  const user:IUser = await getUser(inviteUserId);

  return (
    <div className="w-[300px] mt-10 bg-[rgb(90,90,90)] box-border flex
     flex-col justify-center items-center text-white pt-2 rounded-xl">
      <LogoCard size="xl"
       username={user.username}
       allow={false}
      />
      <div className="mt-5 w-[100%] text-center text-xl mb-2">
        {role == EInvite.ADRESSER
        ? `you sent invite to ${user.username}`
        : `${user.username} want's to be your friend`}
      </div>
      <div className="gap-10 w-[100%] items-center justify-center mb-2 flex">
         <CancelButtonCard id={id} />
         {role == EInvite.RECIPIENT && (
           <AcceptButtonCard
            friendId={addresser}
            inviteId={id}
           />
         )}
      </div>
    </div>
  )
}

export default UserInviteCard