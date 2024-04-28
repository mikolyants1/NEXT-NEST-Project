import { getInviteLikeAdresser} from '@/components/api/query/invite/getInviteLikeAdresser';
import { type Invitation } from '@/components/libs/types/type'
import EmptyNotCard from '../empty/EmptyNotCard';
import UserInviteCard from '../user/UserInviteCard';
import { EInvite } from '@/components/libs/enums/enum';

interface IProps {
  id:string
}

async function AdresserMapCard({id}:IProps):Promise<JSX.Element> {
  const adressInvites:Invitation[] = await getInviteLikeAdresser(id);
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
      ) : <EmptyNotCard />}
    </>
  )
}

export default AdresserMapCard
