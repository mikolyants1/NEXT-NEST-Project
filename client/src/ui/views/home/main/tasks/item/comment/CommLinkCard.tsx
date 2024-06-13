import { commentApiQuery } from '@/api/comments/CommentApiQuery'
import { getTaskComments } from '@/api/query/comment/getComments'
import { taskApiQuery } from '@/api/task/taskApiQuery'
import {type IComment } from '@/libs/types/type'
import Error from '@/ui/load/Error'
import Loading from '@/ui/load/Loading'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

interface IProps {
  taskId:string
}

function CommLinkCard({taskId}:IProps):JSX.Element {
  const {data,isError,isLoading} = useQuery<IComment[]>({
    queryKey:["comments",taskId],
    queryFn:() => commentApiQuery<IComment[],string>("find",taskId)
  });

  if (isLoading) return <Loading />;
  if (isError || !data) return <Error />;

  return (
    <div className="flex justify-end w-[390px]">
      <div className="text-zinc-500">
        <Link href={`/comments/${taskId}`}>
           comments {data.length}
        </Link>
      </div>
    </div>
  )
}

export default CommLinkCard