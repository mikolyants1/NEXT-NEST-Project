import { getUser } from '@/components/api/query/user/getUser'
import { IUser } from '@/components/libs/types/type'
import ProfileCard from '@/components/ui/views/home/main/profile/ProfileCard'
import { Flex } from '@chakra-ui/react'
import {type Metadata } from 'next'
import { use } from 'react'

interface IProps {
    params:{
      id:string,
      role:string
    }
}

export const metadata:Metadata = {
  title:"Profile",
  description:"user profile page"
}

export const revalidate = 3000;

export default function page({params}:IProps):JSX.Element {
  const user:IUser = use(getUser(params.id));
  
  return (
    <div className="w-[100%] flex justify-center items-center flex-col mt-10">
      <ProfileCard user={user} />
    </div>
  )
}
