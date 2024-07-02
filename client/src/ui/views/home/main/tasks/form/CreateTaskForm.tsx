import { taskApiQuery } from '@/api/task/taskApiQuery';
import { ITask, TCreateTaskFormSchema } from '@/libs/types'
import { createTaskSchema } from '@/libs/zod/form';
import { Button, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';

interface IProps {
  createTask:(task:ITask) => void
}

function CreateTaskForm({createTask}:IProps):JSX.Element {
  const {pending} = useFormStatus();
  const [error,setError] = useState<string>("");
  const form = useForm<TCreateTaskFormSchema>({
    defaultValues:{title:""},
    resolver:zodResolver(createTaskSchema)
  });
  const title = form.watch("title");

  const onSubmit = () => {
    taskApiQuery<ITask,string>("create",title)
    .then(createTask)
    .catch(e => {
      if (e instanceof Error){
        setError(e.message);
      }
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
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