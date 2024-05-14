import { createInvite } from '@/components/api/mutation/invite/createInvite';
import { EFriendStatus, EModal } from '@/components/libs/enums/enum';
import { Invitation, type IModalContext } from '@/components/libs/types/type';
import { FriendContext } from '@/components/model/context/friend';
import { ModalContext } from '@/components/model/context/modal';
import { getFriendStatus } from '@/components/model/functions/find/getFriendStatus';
import Error from '@/components/ui/load/Error';
import Loading from '@/components/ui/load/Loading';
import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';

interface IProps {
  id:string
}

function SetUserCard({id}:IProps):JSX.Element {
  const isFriend = useContext<boolean>(FriendContext);
  const {dispatch,onOpen} = useContext<IModalContext>(ModalContext);
  const [isWait,setWait] = useState<boolean>(false);
  const color = isFriend ? "red-500" : "white";
  const {data,isError,isLoading} = useQuery<EFriendStatus>({
    queryKey:["status",id],
    queryFn:() => getFriendStatus(id)
  });
  
  const create = (status:EFriendStatus):void => {
    if (status == EFriendStatus.ADD || !isWait){
      createInvite(id);
      setWait(true);
    }
  }

  const delFriend = () => {
    dispatch({
      type:EModal.REM_FRIEND,
      payload:{friendId:id}
    });
    onOpen();
  }

  if (isLoading) return <Loading />;
  if (isError || !data) return <Error />;

  return (
    <div className={`text-${color} text-xl`}
     onClick={() => isFriend ? delFriend() : create(data)}>
      {(data == EFriendStatus.ADD && !isWait) && <>+</>}
      {(data == EFriendStatus.WAIT || isWait) && <>&#10003;</>}
      {isFriend && "-"}
    </div>
  );
}

export default SetUserCard