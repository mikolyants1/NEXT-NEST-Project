"use client"

import {type IComment } from '@/libs/types/type'
import { useMediaQuery } from '@chakra-ui/react'
import  { useState, useCallback } from 'react'
import CommentCard from './item/CommentCard'
import { createComment } from '@/api/mutation/comment/createComment'
import DayCommCard from './item/DayCommCard'
import checkData from '@/model/functions/compare/compareData'
import CommInputCard from './inputs/CommInputCard'

interface IProps {
  data:IComment[],
  taskId:string,
  userId:string,
  author:string
}

function CommentMapCard({data,taskId,userId,author}:IProps):JSX.Element {
  const [mutComment,setMutComment] = useState<IComment[]>(data);
  const [isWidth] = useMediaQuery('(max-width: 700px)');

  const addComment = useCallback(async (text:string):Promise<void> => {
    const newComm:IComment = await createComment({
      taskId,
      text,
      author
    });
    setMutComment((prv:IComment[]) => ([...prv,newComm]));
  },[author, taskId])

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
        <CommInputCard add={addComment} />
      </>
  )
}

export default CommentMapCard