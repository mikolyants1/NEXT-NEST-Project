"use client"

import { IComment, IStore } from '@/components/libs/types/type'
import { Box, Button, Flex, Input, useMediaQuery } from '@chakra-ui/react'
import React, { ChangeEvent, useState } from 'react'
import CommentCard from './item/CommentCard'
import { createComment } from '@/components/api/mutation/comment/createComment'
import { useStore } from '@/components/model/store/store'
import DayCommCard from './item/DayCommCard'
import checkData from '@/components/model/functions/compare/compareData'

interface IProps {
  data:IComment[],
  taskId:string
}

function CommentMapCard({data,taskId}:IProps):JSX.Element {
  const [comment,setComment] = useState<string>("");
  const [isWidth] = useMediaQuery('(max-width: 700px)');
  const {id:userId,token,name}:IStore = useStore();

  const change = (e:ChangeEvent<HTMLInputElement>):void => {
    setComment(e.target.value);
  }

  const addComment = ():void => {
    createComment({
      userId,
      taskId,
      text:comment,
      token,
      author:name
    });
  }

  return (
      <>
        <Box
         w={isWidth ? "100%" : "80%"}
         overflowY="scroll"
         boxSizing="border-box"
         pl={5} m="10px auto">
          {data.map((c:IComment,idx:number):JSX.Element => {
             const isNewDay:boolean = checkData(data,idx);
             return (
                <>
                {isNewDay && (
                 <DayCommCard time={c.date} />
                )}
                 <CommentCard key={c._id} {...c} />
               </>
             )
          })}
        </Box>
        <Flex m='10px auto'
         w={isWidth ? "100%" : "80%"}
         justifyContent="center"
         alignItems="center">
          <Input w='100%'
           onChange={change}
           bg="rgb(200,200,200)"
           placeholder="write task"
           borderRightRadius={0}
           />
          <Button minW="80px"
           colorScheme="blue"
           borderLeftRadius={0}
           onClick={addComment}>
            add
          </Button>
        </Flex>
      </>
  )
}

export default CommentMapCard