import { actionWithFriend } from '@/components/api/mutation/friend/actionWithFriend';
import { delUser } from '@/components/api/mutation/user/delUser';
import { EFriendAction, EModal } from '@/components/libs/enums/enum';
import { IModalContext, IRemUserState } from '@/components/libs/types/type';
import { ModalContext } from '@/components/model/context/modal';
import { Box, Button, Flex } from '@chakra-ui/react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

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
    <Flex w="100%"
     color="white"
     flexDir='column'
     justifyContent='center'
     alignItems='center'
     gap={2}>
      <Box fontSize={20}>
        Are you sure ?
      </Box>
      <Button onClick={del}
       colorScheme="red"
       mb={2}>
         yes
      </Button>
    </Flex>
  )
}

export default DelFriendOrUserCard