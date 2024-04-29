"use client"

import { useStore } from '@/components/model/store/store';
import {type Invitation,type IStore} from '@/components/libs/types/type';
import { Box, Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Loading from '@/components/ui/load/Loading';
import Error from '@/components/ui/load/Error';
import InviteCount from './invite/InviteCount';
import { getInviteLikeRecipient } from '@/components/api/query/invite/getInviteLikeRecipient';


function InviteLinkCard():JSX.Element {
  const {id}:IStore = useStore();
  const {data,isError,isLoading} = useQuery<Invitation[]>({
    queryKey:["invites",id],
    queryFn:()=>getInviteLikeRecipient(id)
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
          <Link style={{display:"flex",gap:5}}
           href={`/invitation/${id}`}>
            <Box>
               invitations
            </Box>
            <InviteCount length={data.length} />
          </Link>
        </Flex>
  )
}

export default InviteLinkCard