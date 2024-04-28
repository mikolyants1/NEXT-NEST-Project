import { ERoles } from '@/components/libs/enums/enum'
import ProfileCard from '@/components/ui/views/home/main/profile/ProfileCard'
import { Flex } from '@chakra-ui/react'
import {type Metadata } from 'next'
import { redirect } from 'next/navigation'

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
  if (params.role !== ERoles.ADMIN){
    redirect(`main/${params.id}`);
  }

  return (
    <Flex w='100%'
     justifyContent="center"
     alignItems="center"
     flexDir="column"
     mt={10}>
      <ProfileCard />
    </Flex>
  )
}
