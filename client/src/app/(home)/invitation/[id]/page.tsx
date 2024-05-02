import Loading from '@/components/ui/load/Loading'
import AdresserMapCard from '@/components/ui/views/home/notifications/adresser/AdresserMapCard'
import RecipientMapCard from '@/components/ui/views/home/notifications/recipient/RecipientMapCard'
import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import {type Metadata } from 'next'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import dynamic from 'next/dynamic'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { Suspense } from 'react'

interface IProps {
  params:{
    id:string
  }
}
export const metadata:Metadata = {
  title:"Invitations",
  description:"user invitations page" 
}

const AdresserCard = dynamic(() => import("@/components/ui/views/home/invitations/adresser/AdresserMapCard"));

const RecipientCard = dynamic(() => import("@/components/ui/views/home/invitations/recipient/RecipientMapCard"));

export default function page({params}:IProps):JSX.Element {
  const cookieStore:ReadonlyRequestCookies = cookies();
  if (!cookieStore.has("userId")) notFound();
  if (cookieStore.get("userId")?.value !== params.id){
    redirect(`/main/${params.id}`);
  }
  return (
    <Flex w="100%"
     justifyContent="center"
     alignItems="center">
       <Tabs defaultIndex={0}
         display="flex" w="100%"
         justifyContent="center"
         flexDir="column"
         alignItems="center"
         h="100%" mb={2}>
        <TabList w="100%" display="flex"
         justifyContent="space-around">
          {["Adresser","Recipient"].map((t):JSX.Element => (
            <Tab key={t}>{t}</Tab>
          ))}
        </TabList>
        <TabPanels display="flex"
         justifyContent="center"
         alignItems="center"
         mt={10}>
          <TabPanel>
            <AdresserCard id={params.id} />
          </TabPanel>
          <TabPanel>
            <RecipientCard id={params.id} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}
