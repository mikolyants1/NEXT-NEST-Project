"use server"

import { friendApiQuery } from "@/api/friend/friendApiQuery";
import { inviteApiQuery } from "@/api/invite/inviteApiQuery";
import { EFriendStatus, EInvite } from "@/libs/enums/enum";
import { IFriend, Invitation } from "@/libs/types";
import { getCookie } from "@/model/hooks/getCookie";

export const getFriendStatus = async (frId:string):Promise<EFriendStatus> => {
  const userId = await getCookie("userId");
  if (!userId) return EFriendStatus.ADD;
  const already = await friendApiQuery<IFriend[],string>("find",userId);
  if (already.some((f:IFriend) => f.friend_id == frId)){
    return EFriendStatus.FRIEND;
  }
  const addInvites = await inviteApiQuery<Invitation[],EInvite>(
    "find",EInvite.ADRESSER
  );
  const resInvites = await inviteApiQuery<Invitation[],EInvite>(
    "find",EInvite.RECIPIENT
  );
  const searchAddressInvite = addInvites.some((i:Invitation) => (
    i.addresser == userId && i.recipient == frId
  ));
  const searchRecipientInvite = resInvites.some((i:Invitation) => (
    i.addresser == frId && i.recipient == userId
  ));
  const searchInvite = searchAddressInvite || searchRecipientInvite;
  return searchInvite ? EFriendStatus.WAIT : EFriendStatus.ADD;
}