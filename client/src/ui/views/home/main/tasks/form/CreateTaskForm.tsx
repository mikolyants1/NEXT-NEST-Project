import { ITask } from '@/libs/types/type'
import { setTaskAction } from '@/model/actions/setTaskAction'
import { Button, Input } from '@chakra-ui/react';
import React from 'react'
import { useFormStatus } from 'react-dom';

interface IProps {
  createTask:(task:ITask) => void
}

function CreateTaskForm({createTask}:IProps):JSX.Element {
  const action = setTaskAction.bind(null,{createTask});
  const {pending} = useFormStatus();

  return (
    <form action={action}>
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
  )
}

export default CreateTaskForm