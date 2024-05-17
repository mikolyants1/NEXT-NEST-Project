"use server"

import { getFriends } from "@/api/query/friend/getFriend";
import { getInviteLikeAdresser } from "@/api/query/invite/getInviteLikeAdresser";
import { getInviteLikeRecipient } from "@/api/query/invite/getInviteLikeRecipient";
import { EFriendStatus } from "@/libs/enums/enum";
import { IFriend, Invitation } from "@/libs/types/type";
import { cookies } from "next/headers";

export const getFriendStatus = async (frId:string):Promise<EFriendStatus> => {
  const userId = cookies().get("userId")?.value;
  if (!userId) return EFriendStatus.ADD;
  const already:IFriend[] = await getFriends(userId);
  if (already.some((f:IFriend) => f.friend_id == frId)){
    return EFriendStatus.FRIEND;
  }
  const resInvites:Invitation[] = await getInviteLikeRecipient();
  const addInvites:Invitation[] = await getInviteLikeAdresser();
  const searchResInvite = resInvites.some((i:Invitation) => (
    i.recipient == userId && i.addresser == frId
  ));
  const searchAddInvite = addInvites.some((i:Invitation) => (
    i.addresser == userId && i.recipient == frId
  ));
  const found:boolean = searchAddInvite || searchResInvite;
  return found ? EFriendStatus.WAIT : EFriendStatus.ADD;
}