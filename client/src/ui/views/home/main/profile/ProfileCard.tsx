"use client"

import {type IModalContext,type IUser } from '@/libs/types/type'
import { useContext } from 'react'
import LogoCard from '../../header/title/cards/logo/LogoCard';
import { Button } from '@chakra-ui/react';
import { ModalContext } from '@/model/context/modal';
import { EModal } from '@/libs/enums/enum';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import InviteLinkCard from './links/InviteLinkCard';

interface IProps {
  user:IUser
}

function ProfileCard({user}:IProps):JSX.Element {
  const router:AppRouterInstance = useRouter();
  const {dispatch,onOpen} = useContext<IModalContext>(ModalContext);
  
  const updateOpen = () => {
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
  
  const removeOpen = () => {
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
      <div className="text-xl mt-4">
         {`username: ${user.username}`}
      </div>
      <div className="text-xl mt-1">
         {`tag: ${user.tag}`}
      </div>
      <div className="text-xl mt-1">
         raiting:
         <span className="text-green-600">
           {` ${user.raiting}`}
         </span>
      </div>
      <Button mt={5} w={150}
         colorScheme="blue"
         onClick={updateOpen}>
          change data
        </Button>
      <div className="gap-2 mt-2 flex">
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
      </div>
    </>
  )
}

export default ProfileCard