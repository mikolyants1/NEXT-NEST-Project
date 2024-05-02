import { getUser } from '@/components/api/query/user/getUser'
import { ERoles } from '@/components/libs/enums/enum'
import { IUser } from '@/components/libs/types/type'
import ProfileCard from '@/components/ui/views/home/main/profile/ProfileCard'
import { Flex } from '@chakra-ui/react'
import {type Metadata } from 'next'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
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

export default function page({params}:IProps):JSX.Element {
  const cookieStore:ReadonlyRequestCookies = cookies();
  if (!cookieStore.has("userId")) notFound();
  if (cookieStore.get("userId")?.value !== params.id){
    redirect(`/main/${params.id}`);
  }
  const user:IUser = use(getUser(params.id));
  
  return (
    <Flex w='100%'
     justifyContent="center"
     alignItems="center"
     flexDir="column"
     mt={10}>
      <ProfileCard user={user} />
    </Flex>
  )
}
