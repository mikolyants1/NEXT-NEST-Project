import { getInviteLikeRecipient } from '@/components/api/query/invite/getInviteLikeRecipient';
import {type Invitation } from '@/components/libs/types/type';
import EmptyNotCard from '../empty/EmptyNotCard';
import UserInviteCard from '../user/UserInviteCard';
import { EInvite } from '@/components/libs/enums/enum';

interface IProps {
  id:string
}

async function RecipientMapCard({id}:IProps):Promise<JSX.Element> {
  const recipInvites:Invitation[] = await getInviteLikeRecipient(id);
  return (
    <>
      {recipInvites.length ? (
        <>
          {recipInvites.map((n:Invitation):JSX.Element => (
           <UserInviteCard
            key={n.id}
            {...n}
            role={EInvite.RECIPIENT}
           />
         ))}
        </>
      ) : <EmptyNotCard />}
    </>
  );
}

export default RecipientMapCard
