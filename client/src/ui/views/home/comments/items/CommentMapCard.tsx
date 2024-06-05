"use client"

import {type IComment } from '@/libs/types/type'
import { Box, Button, Flex, Input, useMediaQuery } from '@chakra-ui/react'
import  {type ChangeEvent, useState } from 'react'
import CommentCard from './item/CommentCard'
import { createComment } from '@/api/mutation/comment/createComment'
import DayCommCard from './item/DayCommCard'
import checkData from '@/model/functions/compare/compareData'

interface IProps {
  data:IComment[],
  taskId:string,
  userId:string,
  author:string
}

function CommentMapCard({data,taskId,userId,author}:IProps):JSX.Element {
  const [mutComment,setMutComment] = useState<IComment[]>(data);
  const [comment,setComment] = useState<string>("");
  const [isWidth] = useMediaQuery('(max-width: 700px)');
  
  const change = (e:ChangeEvent<HTMLInputElement>):void => {
    setComment(e.target.value);
  }

  const addComment = async ():Promise<void> => {
    const newComm:IComment = await createComment({
      taskId,
      text:comment,
      author
    });
    setMutComment((prv:IComment[]) => ([...prv,newComm]));
  }

  return (
      <>
        <div style={{width:isWidth ? "100%" : "80%"}}
         className='w-[80%] overflow-y-scroll box-border pl-5 mt-10 ml-auto mr-auto'>
          {mutComment.map((c:IComment,idx:number):JSX.Element => {
             const isNewDay:boolean = checkData(data,idx);
             return (
              <>
               {isNewDay && (
                <DayCommCard time={c.date} />
               )}
                <CommentCard
                 userId={userId}
                 change={setMutComment}
                 key={c.id}
                  {...c}
                 />
              </>
             )
          })}
        </div>
        <div style={{width:isWidth ? "100%" : "80%"}}
         className="mt-10 ml-auto mr-auto justify-center items-center flex">
          <Input w='100%'
           onChange={change}
           bg="rgb(200,200,200)"
           placeholder="write comment"
           borderRightRadius={0}
           />
          <Button minW="80px"
           colorScheme="blue"
           borderLeftRadius={0}
           onClick={addComment}>
            add
          </Button>
        </div>
      </>
  )
}

export default CommentMapCard