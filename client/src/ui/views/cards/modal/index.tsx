"use client"

import { EModal } from '@/libs/enums/enum';
import {type IModalContext } from '@/libs/types/type'
import { ModalContext } from '@/model/context/modal'
import Loading from '@/ui/load/Loading';
import { Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { Suspense, lazy, useContext } from 'react'

const UpdateTaskOrCommentCard = lazy(() => import("./updateTaskOrComment/UpdateTaskOrComment"));
const DelFriendOrUserCard = lazy(() => import("./delFriendOrUser/DelFriendOrUserCard"));
const UpdateUserCard = lazy(() => import("./updateUser/UpdateUserCard"));

function ModalCard():JSX.Element {
  const {isOpen,onClose,state} = useContext<IModalContext>(ModalContext);
  
  return (
    <Modal
     isOpen={isOpen}
     onClose={onClose}>
      <ModalOverlay />
      <ModalContent
       bg="rgb(50,50,50)"
       borderRadius={20}
       w={400} mt={200}>
       <ModalHeader mb={5}>
         <ModalCloseButton color="white" />
       </ModalHeader>
       <Suspense fallback={<Loading />}>
         {state.type == EModal.REM_FRIEND && (
            <DelFriendOrUserCard />
         )}
         {state.type == EModal.REM_USER && (
            <DelFriendOrUserCard />
         )}
         {state.type == EModal.UPDATE_TASK && (
            <UpdateTaskOrCommentCard />
         )}
         {state.type == EModal.CHANGE_COMMENT && (
            <UpdateTaskOrCommentCard />
         )}
         {state.type == EModal.UPDATE_USER && (
            <UpdateUserCard />
         )}
       </Suspense>
     </ModalContent>
   </Modal>
  );
}

export default ModalCard