import { getInviteLikeAdresser} from '@/components/api/query/invite/getInviteLikeAdresser';
import { type Invitation } from '@/components/libs/types/type'
import EmptyInviteCard from '../empty/EmptyInviteCard';
import UserInviteCard from '../user/UserInviteCard';
import { EInvite } from '@/components/libs/enums/enum';


async function AdresserMapCard():Promise<JSX.Element> {
  const adressInvites:Invitation[] = await getInviteLikeAdresser();
  return (
    <>
        {adressInvites.length ? (
        <>
          {adressInvites.map((n:Invitation):JSX.Element => (
           <UserInviteCard
            key={n.id}
            {...n}
            role={EInvite.ADRESSER}
           />
          ))}
        </>
        ) : <EmptyInviteCard />}
    </>
  )
}

export default AdresserMapCard
