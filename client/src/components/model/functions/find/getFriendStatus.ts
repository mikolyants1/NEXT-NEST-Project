import { getFriends } from "@/components/api/query/friend/getFriend";
import { getInviteLikeAdresser } from "@/components/api/query/invite/getInviteLikeAdresser";
import { getInviteLikeRecipient } from "@/components/api/query/invite/getInviteLikeRecipient";
import { EFriendStatus } from "@/components/libs/enums/enum";
import { IFriend, Invitation } from "@/components/libs/types/type";

interface IArgs {
  friendId:string,
  userId:string
}

export const getFriendStatus = async ({
    userId,friendId
}:IArgs):Promise<EFriendStatus> => {
  const already:IFriend[] = await getFriends(userId);
  if (already.some((f:IFriend) => f.friend_id == friendId)){
    return EFriendStatus.FRIEND;
  }
  const resInvites:Invitation[] = await getInviteLikeRecipient(userId);
  const addInvites:Invitation[] = await getInviteLikeAdresser(userId);
  const searchResInvite = resInvites.some((i:Invitation) => (
     i.recipient == userId && i.addresser == friendId
  ));
  console.log(resInvites)
  const searchAddInvite = addInvites.some((i:Invitation) => (
    i.addresser == userId && i.recipient == friendId
  ));
  console.log(searchAddInvite,searchResInvite)
  const found:boolean = searchAddInvite || searchResInvite;
  return found ? EFriendStatus.WAIT : EFriendStatus.ADD;
}