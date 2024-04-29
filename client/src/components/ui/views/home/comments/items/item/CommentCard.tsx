
import { EModal } from "@/components/libs/enums/enum";
import { IComment, IModalContext, IStore } from "@/components/libs/types/type"
import { ModalContext } from "@/components/model/context/modal"
import { getTime } from "@/components/model/functions/find/getTime";
import { useStore } from "@/components/model/store/store";
import { Box, Flex } from "@chakra-ui/react";
import { useContext } from "react"

function CommentCard({text,date,author,id,author_id,was_update}:IComment):JSX.Element {
  const {dispatch,onOpen} = useContext<IModalContext>(ModalContext);
  const {id:userId}:IStore = useStore();

  const updateOpen = ():void => {
    if (userId == author_id){
     dispatch({
       type:EModal.UPDATE_COMMENT,
       payload:{id,text}
     })
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
        {author}
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
           {was_update && (
            <Box 
             color="rgb(200,200,200)"
             fontSize={11}>
              changed.
           </Box>
           )}
          {getTime(date)}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default CommentCard