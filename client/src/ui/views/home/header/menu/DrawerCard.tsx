"use client"

import { Drawer, DrawerBody,DrawerCloseButton,DrawerContent,
 DrawerHeader,Image,Tab,TabList,TabPanel,TabPanels,Tabs} from '@chakra-ui/react'
import SearchCard from './search'
import Loading from '@/ui/load/Loading'
import { Suspense, lazy, useState } from 'react'
import { EDrawer } from '@/libs/enums/enum'

interface IProps {
  isOpen:boolean,
  onClose:()=>void
}

const Search = lazy(() => import("../menu/search"));
const Friends = lazy(() => import("../menu/friends"));

function DrawerCard({isOpen,onClose}:IProps):JSX.Element {
  const [title,setTitle] = useState<EDrawer>(EDrawer.SEARCH);

  return (
    <Drawer
     isOpen={isOpen}
     placement='left'
     onClose={onClose}>
      <DrawerContent>
         <DrawerCloseButton />
         <DrawerHeader className='text-center'>
            {title}
         </DrawerHeader>
         <Tabs defaultIndex={0}
          display="grid" w="100%"
          gridTemplateRows="1fr 30px"
          h="100%" mb={2}>
          <Suspense fallback={<Loading />}>
           <TabPanels>
             <TabPanel>
               <Search />
             </TabPanel>
             <TabPanel>
               <Friends />
             </TabPanel>
           </TabPanels>
          </Suspense>
          <TabList
           w="100%" display="flex"
           justifyContent="space-around">
            {Object.values(EDrawer).map((t):JSX.Element => (
              <Tab key={t}
               onClick={() => setTitle(t)}>
                {t}
              </Tab>
            ))}
          </TabList>
        </Tabs>
      </DrawerContent>
    </Drawer>
  )
}

export default DrawerCard