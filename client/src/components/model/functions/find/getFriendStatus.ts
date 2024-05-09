"use server"

import { getFriends } from "@/components/api/query/friend/getFriend";
import { getInviteLikeAdresser } from "@/components/api/query/invite/getInviteLikeAdresser";
import { getInviteLikeRecipient } from "@/components/api/query/invite/getInviteLikeRecipient";
import { EFriendStatus } from "@/components/libs/enums/enum";
import { IFriend, Invitation } from "@/components/libs/types/type";
import { cookies } from "next/headers";

export const getFriendStatus = async (friendId:string):Promise<EFriendStatus> => {
  const userId = cookies().get("userId")?.value;
  if (!userId) return EFriendStatus.ADD;
  const already:IFriend[] = await getFriends(userId);
  if (already.some((f:IFriend) => f.friend_id == friendId)){
    return EFriendStatus.FRIEND;
  }
  const resInvites:Invitation[] = await getInviteLikeRecipient();
  const addInvites:Invitation[] = await getInviteLikeAdresser();
  const searchResInvite = resInvites.some((i:Invitation) => (
    i.recipient == userId && i.addresser == friendId
  ));
  const searchAddInvite = addInvites.some((i:Invitation) => (
    i.addresser == userId && i.recipient == friendId
  ));
  const found:boolean = searchAddInvite || searchResInvite;
  return found ? EFriendStatus.WAIT : EFriendStatus.ADD;
}