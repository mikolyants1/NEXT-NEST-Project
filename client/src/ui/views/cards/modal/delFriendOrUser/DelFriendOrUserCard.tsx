import { friendApiQuery } from '@/api/friend/friendApiQuery';
import { userApiQuery } from '@/api/user/userApiQuery';
import { EFriendAction, EModal } from '@/libs/enums/enum';
import {IFriend, IFriendBody, IUser, type IModalContext,type IRemUserState } from '@/libs/types';
import { ModalContext } from '@/model/context/modal';
import { Button } from '@chakra-ui/react';
import {type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useContext } from 'react'

function DelFriendOrUserCard():JSX.Element {
  const {state} = useContext<IModalContext>(ModalContext);
  const router:AppRouterInstance = useRouter();

  const delFriend = async ():Promise<void> => {
    if (state.type == EModal.REM_FRIEND){
      const data = state.data as IRemUserState;
      friendApiQuery<IFriend,IFriendBody>("deleteOrCreate",{
        action:EFriendAction.REMOVE,
        friendId:data.friendId
      });
    } else if (state.type == EModal.REM_USER) {
      await userApiQuery<IUser,unknown>("remove");
      router.push("/"); 
    }
  }

  return (
    <div className="w-[100%] text-white flex flex-col justify-center items-center gap-2">
      <div className="text-xl">
        Are you sure ?
      </div>
      <Button onClick={delFriend}
       colorScheme="red"
       mb={2}>
         yes
      </Button>
    </div>
  )
}

export default DelFriendOrUserCard