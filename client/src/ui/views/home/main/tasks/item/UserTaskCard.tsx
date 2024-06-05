
import {type IModalContext,type ITask } from '@/libs/types/type';
import { delTask } from '@/api/mutation/task/delTask';
import {type Dispatch,type SetStateAction, useContext, useState } from 'react';
import {motion} from 'framer-motion';
import { ModalContext } from '@/model/context/modal';
import { EModal } from '@/libs/enums/enum';
import CommLinkCard from './comment/CommLinkCard';
import Image from 'next/image';
import bask from '../../../../../../../public/bask.webp';

interface IProps extends ITask {
    userId:string,
    change:Dispatch<SetStateAction<ITask[]>>,
    adminId:string
}

function UserTaskCard({title,id,userId,adminId,change}:IProps):JSX.Element {
  const {dispatch,onOpen} = useContext<IModalContext>(ModalContext);
  const [show,setShow] = useState<boolean>(false);

  const deleteTask = async ():Promise<void> => {
    await delTask(id);
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
      onMouseOver={() =>setShow(true)}
      onMouseOut={()=>setShow(false)}>
        <div className="text-lg"
         onClick={updateOpen}>
          {title}
        </div>
        {(userId == adminId) && (
          <Image src={bask} alt="none"
           className="z-101 transition ease-in-out duration-300 transform translate-x-[45px]"
           style={{transform:`translateX(${show ? 0 : 45}px)`}}
           width={45} height={45}
           onClick={deleteTask}
          />
        )}
      </div>
      <CommLinkCard taskId={id} />
    </>
  )
}

export default UserTaskCard