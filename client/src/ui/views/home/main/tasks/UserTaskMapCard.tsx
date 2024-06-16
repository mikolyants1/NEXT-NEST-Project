"use client"

import {type ITask } from "@/libs/types/type"
import UserTaskCard from "./item/UserTaskCard"
import { Button, Input } from "@chakra-ui/react"
import { useCallback, useState } from "react"
import {motion} from 'framer-motion';
import { setTaskAction } from "@/model/actions/setTaskAction"
import { useFormStatus } from "react-dom"
import CreateTaskForm from "./form/CreateTaskForm"

interface IProps {
  tasks:ITask[],
  userId:string,
  adminId:string
}

function UserTaskMapCard({tasks,userId,adminId}:IProps):JSX.Element {
  const [mutTasks,setMutTasks] = useState<ITask[]>(tasks);
  
  const createTask = useCallback((task:ITask) => {
    setMutTasks((prv:ITask[]) => ([...prv,task]));
  },[]);

  return (
    <>
      {(adminId == userId) && (
        <CreateTaskForm createTask={createTask} />
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