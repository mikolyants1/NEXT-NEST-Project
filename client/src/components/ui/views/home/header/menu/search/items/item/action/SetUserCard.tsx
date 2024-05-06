import { createInvite } from '@/components/api/mutation/invite/createInvite';
import { EFriendStatus, EModal } from '@/components/libs/enums/enum';
import { type IModalContext } from '@/components/libs/types/type';
import { FriendContext } from '@/components/model/context/friend';
import { ModalContext } from '@/components/model/context/modal';
import { getFriendStatus } from '@/components/model/functions/find/getFriendStatus';
import Error from '@/components/ui/load/Error';
import Loading from '@/components/ui/load/Loading';
import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

interface IProps {
  id:string
}
function SetUserCard({id}:IProps):JSX.Element {
  const isFriend = useContext<boolean>(FriendContext);
  const {dispatch,onOpen} = useContext<IModalContext>(ModalContext);
  const {data,isError,isLoading} = useQuery<EFriendStatus>({
    queryKey:["status",id],
    queryFn:() => getFriendStatus(id)
  })
  
  const create = (status:EFriendStatus):void => {
    if (status == EFriendStatus.ADD){
      createInvite(id);
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
    <Box color={isFriend ? "red" : "green"}
     onClick={() => isFriend ? delFriend() : create(data)}
     fontSize={25}>
      {data == EFriendStatus.ADD && <>+</>}
      {data == EFriendStatus.WAIT&& <>&#10003;</>}
      {isFriend && "-"}
    </Box>
  );
}

export default SetUserCard