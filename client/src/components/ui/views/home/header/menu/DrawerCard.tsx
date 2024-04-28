import { useStore } from '@/components/model/store/store'
import {type ILinks,type IStore } from '@/components/libs/types/type'
import { Drawer, DrawerBody,DrawerCloseButton,DrawerContent,
 DrawerHeader,Image,Tab,TabList,TabPanel,TabPanels,Tabs} from '@chakra-ui/react'
import SearchCard from './search/SearchCard'
import Loading from '@/components/ui/load/Loading'
import { Suspense, lazy, useState } from 'react'

interface IProps {
  isOpen:boolean,
  onClose:()=>void
}
const Search = lazy(()=>import("../menu/search/SearchCard"));

const Friend = lazy(()=>import("../menu/friends/FriendCard"));

function DrawerCard({isOpen,onClose}:IProps):JSX.Element {
  const {id}:IStore = useStore();
  const [title,setTitle] = useState<string>("Search");
  return (
    <Drawer
     isOpen={isOpen}
     placement='left'
     onClose={onClose}>
      <DrawerContent>
         <DrawerCloseButton />
         <DrawerHeader
          textAlign="center">
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
               <Friend id={id} />
             </TabPanel>
           </TabPanels>
          </Suspense>
          <TabList
           w="100%" display="flex"
           justifyContent="space-around">
            {["Search","Friends"].map((t):JSX.Element=>(
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