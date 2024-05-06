
import { EModal } from "@/components/libs/enums/enum";
import { IComment, IModalContext} from "@/components/libs/types/type"
import { ModalContext } from "@/components/model/context/modal"
import { getTime } from "@/components/model/functions/find/getTime";
import { Box, Flex } from "@chakra-ui/react";
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
    <Flex maxW='100%'
     alignItems='center'
     boxSizing='border-box'
     color='white' p={4}>
      <Box minW={100}
       textAlign='center'
       color="black"
       fontSize={20}>
        {props.author}
      </Box>
      <Flex minW={250}
       justifyContent='space-between'
       bg='rgb(120,120,120)'
       borderRadius={15} pl={2}
       pr={2} pos="relative"
       onClick={updateOpen}
       alignItems='center'
       fontSize={18}
       h={12} gap={5}>
         <Box>{text}</Box>
         <Flex columnGap={1}
          alignItems="center">
           {props.was_update && (
            <Box 
             color="rgb(200,200,200)"
             fontSize={11}>
              changed.
           </Box>
           )}
          {getTime(props.date)}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default CommentCard