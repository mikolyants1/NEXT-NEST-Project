import { memo } from 'react'
import LogoCard from './logo/LogoCard'
import { getInviteLikeRecipient } from '@/api/query/invite/getInviteLikeRecipient'
import InviteCount from '../../../main/profile/links/invite/InviteCount'
import { getUser } from '@/api/query/user/getUser'
import { useQueries } from '@tanstack/react-query'
import Loading from '@/ui/load/Loading'
import Error from '@/ui/load/Error'

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
    <header className="w-[100%] font-bold bg-[rgb(90,90,90)]">
      <div className="text-white flex w-[90%] items-center h-[80px] justify-between m-auto">
        <div className="text-xl" onClick={onOpen}>
          Menu
        </div>
        <div className="text-3xl">
          {`Karma's duary`}
        </div>
        <div className="relative">
          {invites.data.length ? (
           <div className="right-[-2px] absolute">
             <InviteCount length={invites.data.length} />
           </div>
          ) : <></>}
          <LogoCard
           username={user.data.username}
           size='xs'
           isHeader
           allow
           id={id}
         />
        </div>
      </div>
    </header>
  )
}

export default memo(HeaderTitleCard)