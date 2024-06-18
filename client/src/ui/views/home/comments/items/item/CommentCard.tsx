
import { EModal } from "@/libs/enums/enum";
import { IComment, IModalContext} from "@/libs/types"
import { ModalContext } from "@/model/context/modal"
import { getTime } from "@/model/functions/find/getTime";
import { Dispatch, SetStateAction, useContext } from "react"

interface IProps extends IComment {
  change:Dispatch<SetStateAction<IComment[]>>,
  userId:string
}

function CommentCard({id,text,change,...props}:IProps):JSX.Element {
  const {dispatch,onOpen} = useContext<IModalContext>(ModalContext);

  const updateOpen = () => {
    if (props.userId == props.author_id){
     dispatch({
       type:EModal.CHANGE_COMMENT,
       payload:{id,text,change}
     });
     onOpen();
    }
  }

  return (
    <div className="max-w-[100%] items-center flex box-border text-white p-4">
      <div className="min-w-100 text-center text-[rgb(120,120,120)] text-xl mr-3">
        {props.author}
      </div>
      <div onClick={updateOpen}
       className="flex min-w-[250px] justify-between bg-[rgb(120,120,120)] rounded-xl pr-2 h-10 gap-5 pl-2 relative items-center">
         <div className="text-xl">{text}</div>
         <div className="flex gap-x-1 items-center">
           {props.was_update && (
            <div className="text-[rgb(200,200,200)] ">
              changed.
           </div>
           )}
          {getTime(props.date)}
        </div>
      </div>
    </div>
  );
}

export default CommentCard