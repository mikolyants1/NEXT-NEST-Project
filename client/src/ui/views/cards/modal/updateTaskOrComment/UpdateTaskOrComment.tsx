import { delComment } from '@/api/mutation/comment/delComment';
import { updateComment } from '@/api/mutation/comment/updateComment';
import { updateTask } from '@/api/mutation/task/updateTask';
import { EModal } from '@/libs/enums/enum';
import {type IComment,type IModalContext,type ITask,type IUpdateTaskOrCommState } from '@/libs/types/type';
import { ModalContext } from '@/model/context/modal';
import { Button, Input } from '@chakra-ui/react'
import { ChangeEvent, useContext, useState } from 'react'


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
     <div className="w-[100%] text-xl font-bold text-center text-white mb-2">
        Update {state.type == EModal.UPDATE_TASK ? "task" : "comment"}
     </div>
     <div className="w-[100%] justify-center items-center flex">
      <Input w="80%"
       onChange={change}
       bg="rgb(200,200,200)"
       defaultValue={text}
      />
     </div>
     <div className="w-[80%] gap-x-5 justify-center items-center flex m-[10px_auto_5px_auto]">
       {state.type == EModal.CHANGE_COMMENT && (
       <Button colorScheme="red"
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
     </div>
    </>
  )
}

export default UpdateTaskOrCommentCard