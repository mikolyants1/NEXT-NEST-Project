import { getTaskComments } from '@/api/query/comment/getComments'
import { getTask } from '@/api/query/task/getTask'
import { getUser } from '@/api/query/user/getUser'
import type { IComment, ITask, IUser } from '@/libs/types/type'
import BackLinkCard from '@/ui/views/home/comments/back/BackLinkCard'
import CommentMapCard from '@/ui/views/home/comments/items/CommentMapCard'
import CommentTilteCard from '@/ui/views/home/comments/title/CommentTilteCard'
import type { Metadata } from 'next'
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
      <div className="w-[100%] h-[500px] grid grid-rows-[1fr_60px]">
        <CommentMapCard
         data={comments}
         taskId={params.id}
         userId={id}
         author={user.username}
         />
      </div>
    </>
  )
}

export default page