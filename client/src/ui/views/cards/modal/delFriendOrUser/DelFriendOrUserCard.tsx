import { actionWithFriend } from '@/api/mutation/friend/actionWithFriend';
import { delUser } from '@/api/mutation/user/delUser';
import { EFriendAction, EModal } from '@/libs/enums/enum';
import {type IModalContext,type IRemUserState } from '@/libs/types/type';
import { ModalContext } from '@/model/context/modal';
import { Button } from '@chakra-ui/react';
import {type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useContext } from 'react'

function DelFriendOrUserCard():JSX.Element {
  const {state} = useContext<IModalContext>(ModalContext);
  const router:AppRouterInstance = useRouter();

  const del = async ():Promise<void> => {
    if (state.type == EModal.REM_FRIEND){
      const data = state.data as IRemUserState;
      actionWithFriend({
        action:EFriendAction.REMOVE,
        friendId:data.friendId
      });
    } else if (state.type == EModal.REM_USER) {
      await delUser();
      router.push("/"); 
    }
  }

  return (
    <div className="w-[100%] text-white flex flex-col justify-center items-center gap-2">
      <div className="text-xl">
        Are you sure ?
      </div>
      <Button onClick={del}
       colorScheme="red"
       mb={2}>
         yes
      </Button>
    </div>
  )
}

export default DelFriendOrUserCard