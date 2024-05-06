import { getTaskComments } from '@/components/api/query/comment/getComments'
import { getTask } from '@/components/api/query/task/getTask'
import { getUser } from '@/components/api/query/user/getUser'
import {type IComment,type ITask,type IUser } from '@/components/libs/types/type'
import BackLinkCard from '@/components/ui/views/home/comments/back/BackLinkCard'
import CommentMapCard from '@/components/ui/views/home/comments/items/CommentMapCard'
import CommentTilteCard from '@/components/ui/views/home/comments/title/CommentTilteCard'
import { Grid } from '@chakra-ui/react'
import { Metadata } from 'next'
import { cookies } from 'next/headers'

interface IProps {
  params:{
    id:string
  }
}

export const metadata:Metadata = {
  title:"Comments",
  description:"Comments page"
}

export const revalidate = 3600;

async function page({params}:IProps):Promise<JSX.Element> {
  const id = cookies().get("userId")?.value || "";
  const comments:IComment[] = await getTaskComments(params.id);
  const user:IUser = await getUser(id);
  const task:ITask = await getTask(params.id);

  return (
    <>
      <BackLinkCard />
      <CommentTilteCard
       title={task.title}
       />
      <Grid w="100%" h={500}
       gridTemplateRows="1fr 60px">
        <CommentMapCard
         data={comments}
         taskId={params.id}
         userId={id}
         author={user.username}
         />
      </Grid>
    </>
  )
}

export default page