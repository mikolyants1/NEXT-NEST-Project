import { delComment } from '@/components/api/mutation/comment/delComment';
import { updateComment } from '@/components/api/mutation/comment/updateComment';
import { updateTask } from '@/components/api/mutation/task/updateTask';
import { EModal } from '@/components/libs/enums/enum';
import { IComment, IModalContext,ITask, IUpdateTaskOrCommState } from '@/components/libs/types/type';
import { ModalContext } from '@/components/model/context/modal';
import { Box, Button, Flex, Input } from '@chakra-ui/react'
import React, { ChangeEvent, useContext, useState } from 'react'


function UpdateTaskOrCommentCard():JSX.Element {
  const {state} = useContext<IModalContext>(ModalContext);
  const {text:initText} = state.data as IUpdateTaskOrCommState<unknown>;
  const [text,setText] = useState<string>(initText);

  const change = (e:ChangeEvent<HTMLInputElement>):void => {
    setText(e.target.value);
  }

  const update = async ():Promise<void> => {
    if (state.type == EModal.UPDATE_TASK){
      const {id,change} = state.data as IUpdateTaskOrCommState<ITask[]>;
      const newTask:ITask = await updateTask({taskId:id,title:text});
      change((prv:ITask[]) => (
        prv.map((t:ITask) => t.id == id ? newTask : t)
      ));
    } else if (state.type == EModal.CHANGE_COMMENT) {
      const {id,change} = state.data as IUpdateTaskOrCommState<IComment[]>;
      const newComm:IComment = await updateComment({id,text});
      change((prv:IComment[]) => (
        prv.map((c:IComment) => c.id == id ? newComm : c)
      ));
    }
  }

  const remove = async ():Promise<void> => {
    const {id,change} = state.data as IUpdateTaskOrCommState<IComment[]>;
    await delComment(id);
    change((prv:IComment[]) => (
      prv.filter((c:IComment) => c.id !== id)
    ));
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
      columnGap={5}
      justifyContent="center"
      alignItems="center"
      m="10px auto">
       {state.type == EModal.CHANGE_COMMENT && (
       <Button
        colorScheme="red"
        onClick={remove}>
         delete
       </Button>
       )}
       <Button
        colorScheme="green"
        isDisabled={!text}
        onClick={update}>
         update
       </Button>
     </Flex>
    </>
  )
}

export default UpdateTaskOrCommentCard