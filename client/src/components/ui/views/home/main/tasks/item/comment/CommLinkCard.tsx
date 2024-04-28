import { getTaskComments } from '@/components/api/query/comment/getComments'
import { IComment } from '@/components/libs/types/type'
import Error from '@/components/ui/load/Error'
import Loading from '@/components/ui/load/Loading'
import { Box, Flex } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'

interface IProps {
    taskId:string
}

function CommLinkCard({taskId}:IProps):JSX.Element {
  const {data,isError,isLoading} = useQuery<IComment[]>({
    queryKey:["comments"],
    queryFn:()=>getTaskComments(taskId)
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <Flex w={390}
     justifyContent="end">
      <Box color="grey">
        <Link href={`/comments/${taskId}`}>
         comments {data.length}
        </Link>
      </Box>
    </Flex>
  )
}

export default CommLinkCard