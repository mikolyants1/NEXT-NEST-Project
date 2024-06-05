import { getInviteLikeAdresser} from '@/api/query/invite/getInviteLikeAdresser';
import { type Invitation } from '@/libs/types/type'
import EmptyInviteCard from '../empty/EmptyInviteCard';
import UserInviteCard from '../user/UserInviteCard';
import { EInvite } from '@/libs/enums/enum';
import UserInviteWrapper from '../user/wrappers/UserInviteWrapper';

export async function AdresserMapCard():Promise<JSX.Element> {
  const adressInvites:Invitation[] = await getInviteLikeAdresser();
  return (
    <>
      {adressInvites.length ? (
      <>
        {adressInvites.map((n:Invitation,idx:number):JSX.Element => (
          <UserInviteWrapper
            key={n.id} idx={idx}>
             <UserInviteCard
              role={EInvite.ADRESSER}
              {...n}
             />
          </UserInviteWrapper>
        ))}
      </>
      ) : <EmptyInviteCard />}
    </>
  )
}