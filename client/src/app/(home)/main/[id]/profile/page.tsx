import { userApiQuery } from '@/api/user/userApiQuery'
import type { IUser } from '@/libs/types'
import ProfileCard from '@/ui/views/home/main/profile'
import type { Metadata } from 'next'
import { use } from 'react'

interface IProps {
  params:{
    id:string
  }
}

export const metadata:Metadata = {
  title:"Profile",
  description:"user profile page",
  keywords:"update user, delete user, information about user"
}

export const revalidate = 3000;

export default function page({params:{id}}:IProps):JSX.Element {
  const user = use(userApiQuery<IUser,string>("findById",id));
  
  return (
    <div className="w-[100%] flex justify-center items-center flex-col mt-10">
      <ProfileCard user={user} />
    </div>
  )
}
