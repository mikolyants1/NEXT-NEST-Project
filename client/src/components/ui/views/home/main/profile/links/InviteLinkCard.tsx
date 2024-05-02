"use client"


import {type Invitation} from '@/components/libs/types/type';
import { Box, Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Loading from '@/components/ui/load/Loading';
import Error from '@/components/ui/load/Error';
import InviteCount from './invite/InviteCount';
import { getInviteLikeRecipient } from '@/components/api/query/invite/getInviteLikeRecipient';

interface IProps {
  id:string
}

function InviteLinkCard({id}:IProps):JSX.Element {
  const {data,isError,isLoading} = useQuery<Invitation[]>({
    queryKey:["invites"],
    queryFn:() => getInviteLikeRecipient()
  });

  if (isLoading) return <Loading />;
  if (isError || !data) return <Error />;
  
    return (
       <Flex w="90%"
        fontSize={22}
        fontWeight="bold" m="auto"
        justifyContent="space-between">
          <Link href={`/main/${id}`}
           style={{
              fontSize:20,
              textDecoration:"underline"
            }}>
             back to main
          </Link>
          <Link href={`/invitation/${id}`}>
            <Box pos="relative">
              <Box>invitations</Box>
              <Box pos="absolute"
               top={-1} right={-4}>
                <InviteCount
                 length={data.length}
                 />
              </Box>
            </Box>
          </Link>
        </Flex>
  )
}

export default InviteLinkCard