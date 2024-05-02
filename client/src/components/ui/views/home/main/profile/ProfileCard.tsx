"use client"

import {type IModalContext,type IUser } from '@/components/libs/types/type'
import { useContext } from 'react'
import LogoCard from '../../header/title/cards/logo/LogoCard';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { ModalContext } from '@/components/model/context/modal';
import { EModal } from '@/components/libs/enums/enum';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import InviteLinkCard from './links/InviteLinkCard';

interface IProps {
   user:IUser
}
function ProfileCard({user}:IProps):JSX.Element {
  const router:AppRouterInstance = useRouter();
  const {dispatch,onOpen} = useContext<IModalContext>(ModalContext);
  
  const updateOpen = ():void => {
    dispatch({
       type:EModal.UPDATE_USER,
       payload:{
        username:user.username,
        id:user.id,
        tag:user.tag
      }
    });
    onOpen();
  }
  
  const removeOpen = ():void => {
    dispatch({
      type:EModal.REM_USER,
      payload:{}
    });
    onOpen();
  }

  return (
    <>
      <InviteLinkCard id={user.id} />
      <LogoCard
       username={user.username}
       allow={false}
       size="xl"
      />
      <Box fontSize={22} mt={4}>
         {`username: ${user.username}`}
      </Box>
      <Box fontSize={22} mt={1}>
         {`tag: ${user.tag}`}
      </Box>
      <Box fontSize={22} mt={1}>
         raiting:
         <Text as="span"
          color="green">
           {` ${user.raiting}`}
         </Text>
      </Box>
      <Button mt={5} w={150}
         colorScheme="blue"
         onClick={updateOpen}>
          change data
        </Button>
      <Flex gap={2} mt={2}>
        <Button
         colorScheme="red"
         onClick={removeOpen}>
          delete
        </Button>
        <Button
         colorScheme="red"
         onClick={() => router.push("/")}>
           exit
        </Button>
      </Flex>
    </>
  )
}

export default ProfileCard