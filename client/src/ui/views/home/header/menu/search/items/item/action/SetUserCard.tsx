import { inviteApiQuery } from '@/api/invite/inviteApiQuery';
import { EFriendStatus, EModal } from '@/libs/enums/enum';
import { Invitation, type IModalContext } from '@/libs/types/type';
import { FriendContext } from '@/model/context/friend';
import { ModalContext } from '@/model/context/modal';
import { getFriendStatus } from '@/model/functions/find/getFriendStatus';
import Error from '@/ui/load/Error';
import Loading from '@/ui/load/Loading';
import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';

interface IProps {
  id:string
}

function SetUserCard({id}:IProps):JSX.Element {
  const isFriend = useContext<boolean>(FriendContext);
  const {dispatch,onOpen} = useContext<IModalContext>(ModalContext);
  const [isWait,setWait] = useState<boolean>(false);
  const {data,isError,isLoading} = useQuery<EFriendStatus>({
    queryKey:["status",id],
    queryFn:() => getFriendStatus(id)
  });
  
  const create = (status:EFriendStatus):void => {
    if (status == EFriendStatus.ADD || !isWait){
      inviteApiQuery<Invitation,string>("create",id);
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
    <div className='text-xl'
     onClick={() => isFriend ? delFriend() : create(data)}
     style={{color:isFriend ? "red" : "green"}}>
      {(data == EFriendStatus.ADD && !isWait) && <>+</>}
      {(data == EFriendStatus.WAIT || isWait) && <>&#10003;</>}
      {isFriend && "-"}
    </div>
  );
}

export default SetUserCard