import { getInviteLikeRecipient } from '@/components/api/query/invite/getInviteLikeRecipient';
import {type Invitation } from '@/components/libs/types/type';
import EmptyInviteCard from '../empty/EmptyInviteCard';
import UserInviteCard from '../user/UserInviteCard';
import { EInvite } from '@/components/libs/enums/enum';

async function RecipientMapCard():Promise<JSX.Element> {
  const recipInvites:Invitation[] = await getInviteLikeRecipient();
  return (
    <>
      {recipInvites.length ? (
        <>
          {recipInvites.map((n:Invitation):JSX.Element => (
           <UserInviteCard
            role={EInvite.RECIPIENT}
            key={n.id}
            {...n}
           />
         ))}
        </>
      ) : <EmptyInviteCard />}
    </>
  );
}

export default RecipientMapCard
