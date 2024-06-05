import Loading from '@/ui/load/Loading';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata:Metadata = {
  title:"Invitations",
  description:"user invitations page" 
}

const AdresserCard = dynamic(
  () => import("@/ui/views/home/invitations/adresser/AdresserMapCard")
  .then(res => res.AdresserMapCard),{
  ssr:false,
  loading:() => <Loading />
});

const RecipientCard = dynamic(
  () => import("@/ui/views/home/invitations/recipient/RecipientMapCard")
  .then(res => res.RecipientMapCard),{
  ssr:false,
  loading:() => <Loading />
});

export default function page():JSX.Element {
  return (
    <div className="w-[100%] justify-center items-center flex">
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
            <AdresserCard />
          </TabPanel>
          <TabPanel>
            <RecipientCard />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}
