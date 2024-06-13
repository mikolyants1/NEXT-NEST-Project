import { commentApiQuery } from '@/api/comments/CommentApiQuery'
import { getTaskComments } from '@/api/query/comment/getComments'
import { getUser } from '@/api/query/user/getUser'
import { userApiQuery } from '@/api/user/userApiQuery'
import type { IComment, IUser } from '@/libs/types/type'
import { getCookie } from '@/model/hooks/getCookie'
import Loading from '@/ui/load/Loading'
import BackLinkCard from '@/ui/views/home/comments/back/BackLinkCard'
import CommentMapCard from '@/ui/views/home/comments/items/CommentMapCard'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

interface IProps {
  params:{
    id:string
  }
}

export const metadata:Metadata = {
  title:"Comments",
  description:"Comments page",
  keywords:"see user's comments, update comments, delete comments, create comments"
}

const CommentTitleCard = dynamic(
 () => import("@/ui/views/home/comments/title/CommentTilteCard"),
 {
   ssr:false,
   loading:() => <Loading />
 }
);

async function page({params}:IProps):Promise<JSX.Element> {
  const id = await getCookie("userId");
  const comments = await commentApiQuery<IComment[],string>(
    "find",params.id
  );
  const user = await userApiQuery<IUser,string>("findById",id);
  
  return (
    <>
      <BackLinkCard />
      <CommentTitleCard id={params.id} />
      <div className="w-[100%] h-[500px] grid grid-rows-[1fr_60px]">
        <CommentMapCard
         data={comments}
         taskId={params.id}
         userId={id}
         author={user.username}
         />
      </div>
    </>
  )
}

export default page