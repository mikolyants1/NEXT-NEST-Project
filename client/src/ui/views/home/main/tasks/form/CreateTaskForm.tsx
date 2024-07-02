import { taskApiQuery } from '@/api/task/taskApiQuery';
import {type ITask } from '@/libs/types'
import { createTaskSchema } from '@/libs/zod/form';
import { Button, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface IProps {
  createTask:(task:ITask) => void
}

type TCreateTaskFormSchema = z.infer<typeof createTaskSchema>;

function CreateTaskForm({createTask}:IProps):JSX.Element {
  const [loading,setLoading] = useState<boolean>(false);
  const [error,setError] = useState<string>("");
  const form = useForm<TCreateTaskFormSchema>({
    resolver:zodResolver(createTaskSchema)
  });
  const title = form.watch("title","");

  const onSubmit = async ():Promise<void> => {
    setError("");
    setLoading(true);
    taskApiQuery<ITask,string>("create",title)
    .then((data:ITask) => {
      createTask(data);
      form.setValue("title","");
    })
    .catch((e) => {
       if (e instanceof Error){
        setError(e.message)
       }
    })
    .finally(() => setLoading(false));
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
         isDisabled={loading}
         type="submit">
           add
        </Button>
      </div>
      {!!error && (
        <div className='w-100 mb-2 mt-2 text-red-500 text-center'>
          {error}
        </div>
      )}
    </form>
  );
}

export default CreateTaskForm