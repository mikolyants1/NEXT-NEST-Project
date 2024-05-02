import { Box} from '@chakra-ui/react'
import { memo } from 'react'
import LogoCard from './logo/LogoCard'
import HeaderWrapper from '../HeaderWrapper';
import { getInviteLikeRecipient } from '@/components/api/query/invite/getInviteLikeRecipient'
import InviteCount from '../../../main/profile/links/invite/InviteCount'
import { getUser } from '@/components/api/query/user/getUser'
import { useQueries } from '@tanstack/react-query'
import Loading from '@/components/ui/load/Loading'
import Error from '@/components/ui/load/Error'

interface IProps {
  onOpen:()=>void,
  id:string
}

function HeaderTitleCard({onOpen,id}:IProps):JSX.Element {
  const [user,invites] = useQueries({queries:[
    {
      queryKey:["user",id],
      queryFn:() => getUser(id)
    },
    {
      queryKey:["recipient"],
      queryFn:() => getInviteLikeRecipient()
    }
  ]});

  if (user.isLoading || invites.isLoading) return <Loading />;
  if (user.isError || invites.isError) return <Error />;
  if (!user.data || !invites.data) return <Error />;

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
          {invites.data.length ? (
           <Box right={-2} pos='absolute'>
             <InviteCount length={invites.data.length} />
           </Box>
          ) : <></>}
          <LogoCard
           username={user.data.username}
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