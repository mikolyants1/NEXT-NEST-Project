"use client"

import {type Invitation} from '@/libs/types';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Loading from '@/ui/load/Loading';
import Error from '@/ui/load/Error';
import InviteCount from './invite/InviteCount';
import { EInvite } from '@/libs/enums/enum';
import { inviteApiQuery } from '@/api/invite/inviteApiQuery';

interface IProps {
  id:string
}

function InviteLinkCard({id}:IProps):JSX.Element {
  const {data,isError,isLoading} = useQuery<Invitation[]>({
    queryKey:["invites"],
    queryFn:() => inviteApiQuery<Invitation[],EInvite>("find",EInvite.RECIPIENT)
  });

  if (isLoading) return <Loading />;
  if (isError || !data) return <Error />;
  
    return (
       <div className="w-[90%] text-xl font-bold justify-between m-auto flex">
          <Link className="text-xl underline"
           href={`/main/${id}`}>
             back to main
          </Link>
          <Link href={`/invitation/${id}`}>
            <div className="relative">
              <div>invitations</div>
              <div className="absolute top-[-6px] right-[-10px]">
                <InviteCount length={data.length} />
              </div>
            </div>
          </Link>
        </div>
  )
}

export default InviteLinkCard