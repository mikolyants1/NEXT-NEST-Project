
import {type IModalContext,type ITask } from '@/libs/types';
import {type Dispatch,type SetStateAction, useContext, useState } from 'react';
import { ModalContext } from '@/model/context/modal';
import { EModal } from '@/libs/enums/enum';
import CommLinkCard from './comment/CommLinkCard';
import { TrashIcon } from '@heroicons/react/24/outline';
import { taskApiQuery } from '@/api/task/taskApiQuery';
import { AnimatePresence , motion } from 'framer-motion';

interface IProps extends ITask {
    userId:string,
    change:Dispatch<SetStateAction<ITask[]>>,
    adminId:string
}

function UserTaskCard({title,id,userId,adminId,change}:IProps):JSX.Element {
  const {dispatch,onOpen} = useContext<IModalContext>(ModalContext);
  const [show,setShow] = useState<boolean>(false);

  const deleteTask = async ():Promise<void> => {
    await taskApiQuery<ITask,string>("remove",id);
    change((prv:ITask[]) => (
      prv.filter((t:ITask) => t.id !== id)
    ));
  }

  const updateOpen = ():void => {
    dispatch({
      type:EModal.UPDATE_TASK,
      payload:{id,text:title,change}
    });
    onOpen();
  }

  return (
    <>
     <div className="w-100 mt-5 h-[45px] rounded-lg justify-between pl-1 flex
      items-center box-border gap-x-[3px] overflow-hidden text-white bg-[rgb(100,100,100)]"
      onMouseOver={() => setShow(true)}
      onMouseOut={() => setShow(false)}>
        <div className="text-lg"
         onClick={updateOpen}>
          {title}
        </div>
        {(userId == adminId) && (
          <AnimatePresence>
            {show && (
             <motion.div
              initial={{translateX:45}}
              animate={{translateX:0}}
              exit={{translateX:45}}>
               <TrashIcon
                width={45} height={45}
                className="z-10 text-xs text-white bg-red-500"
                onClick={deleteTask}
                />
             </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
      <CommLinkCard taskId={id} />
    </>
  )
}

export default UserTaskCard