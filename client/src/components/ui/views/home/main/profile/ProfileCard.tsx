"use client"

import { IModalContext, IStore, IUser } from '@/components/libs/types/type'
import { useStore } from '@/components/model/store/store'
import React, { useContext } from 'react'
import LogoCard from '../../header/title/cards/logo/LogoCard';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/components/api/query/user/getUser';
import Loading from '@/components/ui/load/Loading';
import Error from '@/components/ui/load/Error';
import { ModalContext } from '@/components/model/context/modal';
import { EModal } from '@/components/libs/enums/enum';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import InviteLinkCard from './links/InviteLinkCard';

function ProfileCard():JSX.Element {
  const {id,name,tag,token}:IStore = useStore();
  const router:AppRouterInstance = useRouter();
  const {dispatch,onOpen} = useContext<IModalContext>(ModalContext);
  const {data,isError,isLoading} = useQuery<IUser>({
    queryKey:["user",id],
    queryFn:()=>getUser(id)
  });

  const updateOpen = ():void => {
    dispatch({
       type:EModal.UPDATE_USER,
       payload:{username:name,id,tag}
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

  if (isLoading) return <Loading />;
  if (isError || !data) return <Error />;

  return (
    <>
      <InviteLinkCard />
      <LogoCard
       username={data.username}
       allow={false}
       size="xl"
      />
      <Box fontSize={22} mt={4}>
         {`username: ${data.username}`}
      </Box>
      <Box fontSize={22} mt={1}>
         {`tag: ${data.tag}`}
      </Box>
      <Box fontSize={22} mt={1}>
         raiting:
         <Text as="span"
          color="green">
           {` ${data.raiting}`}
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