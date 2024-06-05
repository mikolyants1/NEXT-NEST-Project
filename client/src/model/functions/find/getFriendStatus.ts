"use server"

import { getFriends } from "@/api/query/friend/getFriend";
import { getInviteLikeAdresser } from "@/api/query/invite/getInviteLikeAdresser";
import { getInviteLikeRecipient } from "@/api/query/invite/getInviteLikeRecipient";
import { EFriendStatus } from "@/libs/enums/enum";
import { IFriend, Invitation } from "@/libs/types/type";
import { getCookie } from "@/model/hooks/useCookie";

export const getFriendStatus = async (frId:string):Promise<EFriendStatus> => {
  const userId = getCookie("userId");
  if (!userId) return EFriendStatus.ADD;
  const already:IFriend[] = await getFriends(userId);
  if (already.some((f:IFriend) => f.friend_id == frId)){
    return EFriendStatus.FRIEND;
  }
  const addInvites:Invitation[] = await getInviteLikeAdresser();
  const resInvites:Invitation[] = await getInviteLikeRecipient();
  const searchAddressInvite = addInvites.some((i:Invitation) => (
    i.addresser == userId && i.recipient == frId
  ));
  const searchRecipientInvite = resInvites.some((i:Invitation) => (
    i.addresser == frId && i.recipient == userId
  ));
  const searchInvite = searchAddressInvite || searchRecipientInvite;
  return searchInvite ? EFriendStatus.WAIT : EFriendStatus.ADD;
}