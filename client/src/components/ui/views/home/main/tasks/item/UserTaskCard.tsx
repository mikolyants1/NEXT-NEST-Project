
import { IModalContext, IStore, ITask } from '@/components/libs/types/type';
import { Box, Flex, Image } from '@chakra-ui/react';
import bask from '@/app/bask.png';
import { useStore } from '@/components/model/store/store';
import { delTask } from '@/components/api/mutation/task/delTask';
import { MouseEvent, useContext, useState } from 'react';
import {motion} from 'framer-motion';
import { ModalContext } from '@/components/model/context/modal';
import { EModal } from '@/components/libs/enums/enum';
import CommLinkCard from './comment/CommLinkCard';

interface IProps extends ITask {
    userId:string
}

function UserTaskCard({title,id,userId}:IProps):JSX.Element {
  const {id:adminId,token}:IStore = useStore();
  const {dispatch,onOpen} = useContext<IModalContext>(ModalContext);
  const [show,setShow] = useState<boolean>(false);

  const deleteTask = ():void => {
    delTask({userId,taskId:id,token});
  }

  const hover = (e:MouseEvent<HTMLDivElement>):void => {
    setShow(e.type == "mouseover");
  }

  const updateOpen = ():void => {
    dispatch({
      type:EModal.UPDATE_TASK_COMMENT,
      payload:{id,text:title}
    });
    onOpen();
  }

  return (
    <>
     <Flex w={400} mt={5}
      h="45px" borderRadius={10}
      justifyContent="space-between"
      alignItems="center" pl={2}
      boxSizing="border-box"
      columnGap={3}
      overflow="hidden"
      bg="rgb(100,100,100)"
      onClick={updateOpen}
      onMouseOver={hover}
      onMouseOut={hover}
      color="white">
        <Box color="white"
         fontSize={17}>
          {title}
        </Box>
        {(userId == adminId)&&show&&(
          <motion.div
           initial={{transform:"translate(45px)"}}
           animate={{transform:`translate(${show ? 0 : 45}px)`}}
           style={{width:45,height:45}}>
            <Image
             onClick={deleteTask}
             src='https://thumbs.dreamstime.com/b/trashcan-%D0%B7%D0%BD%D0%B0%D1%87%D0%BE%D0%BA-%D1%81%D0%B8%D0%BC%D0%B2%D0%BE-%D0%BC%D1%83%D1%81%D0%BE%D1%80%D0%BD%D0%BE%D0%B9-%D0%BA%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D1%8B-%D0%BF-%D0%BE%D1%81%D0%BA%D0%BE-78673675.jpg'
             w="100%"
             h="100%"
             alt=''
            />
         </motion.div>
        )}
      </Flex>
      <CommLinkCard taskId={id} />
    </>
  )
}

export default UserTaskCard