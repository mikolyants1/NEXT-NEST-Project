"use client"

import { Box} from '@chakra-ui/react'
import { memo } from 'react'
import LogoCard from './logo/LogoCard'
import HeaderWrapper from '../HeaderWrapper'
import { IStore } from '@/components/libs/types/type'
import { useStore } from '@/components/model/store/store'

interface IProps {
  onOpen:()=>void
}
function HeaderTitleCard({onOpen}:IProps):JSX.Element {
  const {name,id}:IStore = useStore();

  return (
    <Box w='100%'
     fontWeight='bold'
     bg='rgb(90,90,90)'>
      <HeaderWrapper>
        <Box onClick={onOpen}
         fontSize={20}>
          Menu
        </Box>
        <Box fontSize={30}>
          {`Karma's duary`}
        </Box>
        <LogoCard
         username={name}
         size='xs'
         isHeader
         allow
         id={id}
         />
      </HeaderWrapper>
    </Box>
  )
}

export default memo(HeaderTitleCard)