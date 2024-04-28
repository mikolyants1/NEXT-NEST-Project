import { createInvite } from '@/components/api/mutation/invite/createInvite';
import { EFriendStatus, EModal } from '@/components/libs/enums/enum';
import { IModalContext, IStore } from '@/components/libs/types/type';
import { FriendContext } from '@/components/model/context/friend';
import { ModalContext } from '@/components/model/context/modal';
import { getFriendStatus } from '@/components/model/functions/find/getFriendStatus';
import { useStore } from '@/components/model/store/store';
import { Box } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react'

interface IProps {
  friendId:string
}
function SetUserCard({friendId}:IProps):JSX.Element {
  const {id,token}:IStore = useStore();
  const isFriend = useContext<boolean>(FriendContext);
  const [status,setStatus] = useState<EFriendStatus>(EFriendStatus.ADD);
  const {dispatch,onOpen} = useContext<IModalContext>(ModalContext);

  useEffect(() => {
   (async () => {
    const res:EFriendStatus = await getFriendStatus({
        userId:id,
        friendId
    });
    setStatus(res);
   })();
  },[]);

  const create = ():void => {
    if (status == EFriendStatus.ADD){
      createInvite({
        recipient:friendId,
        userId:id,
        token
      });
    }
  }

  const delFriend = ():void => {
    dispatch({
      type:EModal.REM_FRIEND,
      payload:{friendId}
    });
    onOpen();
  }

  return (
    <Box color={isFriend ? "red" : "green"}
     fontSize={25}
     onClick={isFriend ? delFriend : create}>
      {status == EFriendStatus.ADD && <>+</>}
      {status == EFriendStatus.WAIT&& <>&#10003;</>}
      {isFriend && "-"}
    </Box>
  );
}

export default SetUserCard