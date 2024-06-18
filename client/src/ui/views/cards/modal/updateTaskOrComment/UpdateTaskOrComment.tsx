import { commentApiQuery } from '@/api/comments/CommentApiQuery';
import { taskApiQuery } from '@/api/task/taskApiQuery';
import { EModal } from '@/libs/enums/enum';
import {ICommUpdateBody, ITaskUpdateBody, type IComment,
type IModalContext,type ITask,type IUpdateTaskOrCommState } from '@/libs/types';
import { ModalContext } from '@/model/context/modal';
import { Button, Input } from '@chakra-ui/react'
import { ChangeEvent, useContext, useState } from 'react'


function UpdateTaskOrCommentCard():JSX.Element {
  const {state,onClose} = useContext<IModalContext>(ModalContext);
  const {text:initText} = state.data as IUpdateTaskOrCommState<unknown>;
  const [text,setText] = useState<string>(initText);

  const change = (e:ChangeEvent<HTMLInputElement>):void => {
    setText(e.target.value);
  }

  const update = async ():Promise<void> => {
    if (state.type == EModal.UPDATE_TASK){
      const {id,change} = state.data as IUpdateTaskOrCommState<ITask[]>;
      const newTask = await taskApiQuery<ITask,ITaskUpdateBody>(
        "update",{taskId:id,title:text}
      );
      change((prv:ITask[]) => (
        prv.map((t:ITask) => t.id == id ? newTask : t)
      ));
    } else if (state.type == EModal.CHANGE_COMMENT) {
      const {id,change} = state.data as IUpdateTaskOrCommState<IComment[]>;
      const newComm = await commentApiQuery<IComment,ICommUpdateBody>(
        "update",{id,text}
      );
      change((prv:IComment[]) => (
        prv.map((c:IComment) => c.id == id ? newComm : c)
      ));
    }
    onClose();
  }

  const remove = async ():Promise<void> => {
    const {id,change} = state.data as IUpdateTaskOrCommState<IComment[]>;
    await commentApiQuery<IComment,string>("remove",id);
    change((prv:IComment[]) => (
      prv.filter((c:IComment) => c.id !== id)
    ));
    onClose();
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