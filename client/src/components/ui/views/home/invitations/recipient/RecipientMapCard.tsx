import { getInviteLikeRecipient } from '@/components/api/query/invite/getInviteLikeRecipient';
import {type Invitation } from '@/components/libs/types/type';
import EmptyInviteCard from '../empty/EmptyInviteCard';
import UserInviteCard from '../user/UserInviteCard';
import { EInvite } from '@/components/libs/enums/enum';
import {motion} from 'framer-motion';
import UserInviteWrapper from '../user/wrappers/UserInviteWrapper';

async function RecipientMapCard():Promise<JSX.Element> {
  const recipInvites:Invitation[] = await getInviteLikeRecipient();
  return (
    <>
      {recipInvites.length ? (
        <>
          {recipInvites.map((n:Invitation,idx:number):JSX.Element => (
            <UserInviteWrapper
             key={n.id} idx={idx}>
             <UserInviteCard
              role={EInvite.RECIPIENT}
              {...n}
              />
           </UserInviteWrapper>
         ))}
        </>
      ) : <EmptyInviteCard />}
    </>
  );
}

export default RecipientMapCard
