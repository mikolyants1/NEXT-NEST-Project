import { updateComment } from '@/components/api/mutation/comment/updateComment';
import { updateTask } from '@/components/api/mutation/task/updateTask';
import { updateUser } from '@/components/api/mutation/user/updateUser';
import { EModal } from '@/components/libs/enums/enum';
import { IModalContext, IStore, IUpdateTaskOrCommState } from '@/components/libs/types/type';
import { ModalContext } from '@/components/model/context/modal';
import { useStore } from '@/components/model/store/store';
import { Box, Button, Flex, Input } from '@chakra-ui/react'
import React, { ChangeEvent, useContext, useState } from 'react'



function UpdateTaskOrCommentCard():JSX.Element {
  const {state} = useContext<IModalContext>(ModalContext);
  const data = state.data as  IUpdateTaskOrCommState;
  const [text,setText] = useState<string>(data.text);
  const {token,id:userId}:IStore = useStore();

  const change = (e:ChangeEvent<HTMLInputElement>):void => {
    setText(e.target.value);
  }

  const update = ():void => {
    if (state.type == EModal.UPDATE_TASK){
      updateTask({
        userId,
        token,
        taskId:data.id,
        title:text
      });
    } else {
      updateComment({
         id:data.id,
         text,
         token,
         userId
      })
    }
  }

  return (
    <>
     <Box w="100%"
      fontSize={20}
      fontWeight="bold"
      textAlign="center"
      color="white" mb={2}>
        Update {state.type == EModal.UPDATE_TASK ? "task" : "comment"}
     </Box>
     <Flex w="100%"
      justifyContent="center"
      alignItems="center">
      <Input w="80%"
       onChange={change}
       bg="rgb(200,200,200)"
       defaultValue={text}
      />
     </Flex>
     <Flex w="80%"
      justifyContent="end"
      m="10px auto">
       <Button
        colorScheme="red"
        isDisabled={!text}
        onClick={update}>
         update
       </Button>
     </Flex>
    </>
  )
}

export default UpdateTaskOrCommentCard