import { type Invitation } from '@/libs/types'
import { EInvite } from '@/libs/enums/enum';
import UserInviteWrapper from './user/wrappers/UserInviteWrapper';
import EmptyInviteCard from './empty/EmptyInviteCard';
import UserInviteCard from './user/UserInviteCard';
import { inviteApiQuery } from '@/api/invite/inviteApiQuery';

interface IProps {
  role:EInvite
}

export async function InviteMapCard({role}:IProps):Promise<JSX.Element> {
  const invites = await inviteApiQuery<Invitation[],EInvite>("find",role);
  return (
    <>
      {invites.length ? (
      <>
        {invites.map((n:Invitation,idx:number):JSX.Element => (
          <UserInviteWrapper
            key={n.id} idx={idx}>
            <UserInviteCard role={role} {...n} />
          </UserInviteWrapper>
        ))}
      </>
      ) : <EmptyInviteCard />}
    </>
  )
}