"use client"

import { IStore, ITask } from "@/components/libs/types/type"
import UserTaskCard from "./item/UserTaskCard"
import { Button, Flex, Input } from "@chakra-ui/react"
import { ChangeEvent, useState } from "react"
import { useStore } from "@/components/model/store/store"
import { createTask } from "@/components/api/mutation/task/createTask"

interface IProps {
  tasks:ITask[],
  userId:string
}

function UserTaskMapCard({tasks,userId}:IProps):JSX.Element {
  const [mutTasks,setMutTasks] = useState(tasks);
  const [title,setTitle] = useState<string>("");
  const {id,token}:IStore = useStore();
  
  const change = (e:ChangeEvent<HTMLInputElement>):void => {
    setTitle(e.target.value);
  }

  const addTask = async ():Promise<void> => {
   const data = await createTask({userId:id,token,title});
   setMutTasks((prv:ITask[]) => ([...prv,data]));
  }
  return (
    <>
      {(id == userId) && (
       <Flex mt={5} w={400}>
         <Input w={320}
          onChange={change}
          bg="rgb(200,200,200)"
          placeholder="write task"
          borderRightRadius={0}
         />
         <Button w="80px"
          colorScheme="blue"
          borderLeftRadius={0}
          onClick={addTask}>
           add
         </Button>
       </Flex>
      )}
      {mutTasks.map((t:ITask):JSX.Element=>(
        <UserTaskCard
         setMutTasks={setMutTasks}
         key={t.id}
         userId={userId}
         {...t}
        />
      ))}
    </>
  )
}

export default UserTaskMapCard