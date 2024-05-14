import { getTaskComments } from '@/components/api/query/comment/getComments'
import { IComment } from '@/components/libs/types/type'
import Error from '@/components/ui/load/Error'
import Loading from '@/components/ui/load/Loading'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'

interface IProps {
    taskId:string
}

function CommLinkCard({taskId}:IProps):JSX.Element {
  const {data,isError,isLoading} = useQuery<IComment[]>({
    queryKey:["comments",taskId],
    queryFn:()=>getTaskComments(taskId)
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