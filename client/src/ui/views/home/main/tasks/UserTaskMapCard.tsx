"use client"

import {type ITask } from "@/libs/types/type"
import UserTaskCard from "./item/UserTaskCard"
import { Button, Input } from "@chakra-ui/react"
import { useState } from "react"
import {motion} from 'framer-motion';
import { setTaskAction } from "@/model/actions/setTaskAction"
import { useFormStatus } from "react-dom"

interface IProps {
  tasks:ITask[],
  userId:string,
  adminId:string
}

function UserTaskMapCard({tasks,userId,adminId}:IProps):JSX.Element {
  const [mutTasks,setMutTasks] = useState<ITask[]>(tasks);
  const taskAction = setTaskAction.bind(null,{setMutTasks});
  const {pending} = useFormStatus();

  return (
    <>
      {(adminId == userId) && (
        <form action={taskAction}>
          <div className="mt-[5px] w-100 flex">
            <Input w={320}
             bg="rgb(200,200,200)"
             placeholder="write task"
             borderRightRadius={0}
             name="title"
            />
            <Button w="80px"
             colorScheme="blue"
             borderLeftRadius={0}
             isDisabled={pending}
             type="submit">
              add
           </Button>
         </div>
       </form>
      )}
      {mutTasks.map((t:ITask,idx:number):JSX.Element => (
       <motion.div key={t.id}
        initial={{opacity:0,translateY:-50}}
        animate={{opacity:1,translateY:0}}
        transition={{delay:idx * 0.3,type:"spring"}}>
          <UserTaskCard
           adminId={adminId}
           change={setMutTasks}
           userId={userId}
           {...t}
           />
        </motion.div>
      ))}
    </>
  )
}

export default UserTaskMapCard