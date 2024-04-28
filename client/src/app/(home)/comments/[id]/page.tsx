import { getTaskComments } from '@/components/api/query/comment/getComments'
import { getTask } from '@/components/api/query/task/getTask'
import { IComment, ITask } from '@/components/libs/types/type'
import BackLinkCard from '@/components/ui/views/home/comments/back/BackLinkCard'
import CommentMapCard from '@/components/ui/views/home/comments/items/CommentMapCard'
import CommentTilteCard from '@/components/ui/views/home/comments/title/CommentTilteCard'
import { Box, Grid } from '@chakra-ui/react'
import { Metadata } from 'next'
import React from 'react'

interface IProps {
  params:{
    id:string
  }
}

export const metadata:Metadata = {
  title:"Comments",
  description:"Comments page"
}

async function page({params}:IProps):Promise<JSX.Element> {
  const comments:IComment[] = await getTaskComments(params.id);
  const task:ITask = await getTask(params.id);

  return (
    <>
      <BackLinkCard />
      <CommentTilteCard
       title={task.title}
       />
      <Grid w="100%"
       gridTemplateRows="1fr 60px"
       h={500}>
        <CommentMapCard
         data={comments}
         taskId={params.id}
         />
      </Grid>
    </>
  )
}

export default page