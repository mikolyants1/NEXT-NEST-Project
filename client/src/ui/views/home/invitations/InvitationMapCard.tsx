import { getInvite } from '@/api/query/invite/getInvite';
import { type Invitation } from '@/libs/types/type'
import { EInvite } from '@/libs/enums/enum';
import UserInviteWrapper from './user/wrappers/UserInviteWrapper';
import EmptyInviteCard from './empty/EmptyInviteCard';
import UserInviteCard from './user/UserInviteCard';

interface IProps {
  role:EInvite
}

export async function InviteMapCard({role}:IProps):Promise<JSX.Element> {
  const invites:Invitation[] = await getInvite(role);
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