"use client"

import {ICommBody, type IComment } from '@/libs/types'
import { useMediaQuery } from '@chakra-ui/react'
import  { useState, useCallback } from 'react'
import CommentCard from './item/CommentCard'
import DayCommCard from './item/DayCommCard'
import checkData from '@/model/functions/compare/compareData'
import CommInputCard from './inputs/CommInputCard'
import { commentApiQuery } from '@/api/comments/CommentApiQuery'

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
    const newComm = await commentApiQuery<IComment,ICommBody>(
      "create",{taskId,text,author}
    );
    setMutComment((prv:IComment[]) => ([...prv,newComm]));
  },[author, taskId])

  return (
    <>
      <div style={{width:isWidth ? "100%" : "80%"}}
       className='w-[80%] overflow-y-scroll box-border pl-5 mt-10 ml-auto mr-auto'>
        {mutComment.map((c:IComment,idx:number):JSX.Element => (
            <>
              {checkData(data,idx) && (
                <DayCommCard time={c.date} />
              )}
              <CommentCard
               userId={userId}
               change={setMutComment}
               key={c.id}
               {...c}
               />
            </>
        ))}
      </div>
      <CommInputCard add={addComment} />
    </>
  )
}

export default CommentMapCard