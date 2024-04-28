"use client"

import { Box} from '@chakra-ui/react'
import { memo } from 'react'
import LogoCard from './logo/LogoCard'
import HeaderWrapper from '../HeaderWrapper'
import { IStore, Invitation } from '@/components/libs/types/type'
import { useStore } from '@/components/model/store/store'
import { useQuery } from '@tanstack/react-query'
import { getInviteLikeRecipient } from '@/components/api/query/invite/getInviteLikeRecipient'
import Loading from '@/components/ui/load/Loading'
import Error from '@/components/ui/load/Error'
import InviteCount from '../../../main/profile/links/invite/InviteCount'

interface IProps {
  onOpen:()=>void
}
function HeaderTitleCard({onOpen}:IProps):JSX.Element {
  const {name,id}:IStore = useStore();
  const {data,isError,isLoading} = useQuery<Invitation[]>({
    queryKey:["invites",id],
    queryFn:()=>getInviteLikeRecipient(id)
  });

  if (isLoading) return <Loading />;
  if (isError || !data) return <Error />;

  return (
    <Box w='100%'
     fontWeight='bold'
     bg='rgb(90,90,90)'>
      <HeaderWrapper>
        <Box onClick={onOpen}
         fontSize={20}>
          Menu
        </Box>
        <Box fontSize={30}>
          {`Karma's duary`}
        </Box>
        <Box pos="relative">
          {data.length && (
           <Box pos="absolute"
            right={-2}>
             <InviteCount length={data.length} />
           </Box>
          )}
          <LogoCard
           username={name}
           size='xs'
           isHeader
           allow
           id={id}
         />
        </Box>
      </HeaderWrapper>
    </Box>
  )
}

export default memo(HeaderTitleCard)