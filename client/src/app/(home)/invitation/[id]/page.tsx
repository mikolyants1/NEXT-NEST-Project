
import { EInvite } from '@/libs/enums/enum';
import Loading from '@/ui/load/Loading';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata:Metadata = {
  title:"Invitations",
  description:"user invitations page",
  keywords:"accept invitation, delete invitation, see user's invitations"
}

const InviteMapCard = dynamic(
  () => import("@/ui/views/home/invitations/InvitationMapCard")
  .then(res => res.InviteMapCard),{
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
        <TabPanels mt={10}
         justifyContent="center"
         alignItems="center"
         display="flex">
         {Object.values(EInvite).map((r):JSX.Element => (
          <TabPanel key={r}>
            <InviteMapCard role={r} />
          </TabPanel>
         ))}
        </TabPanels>
      </Tabs>
    </div>
  )
}
