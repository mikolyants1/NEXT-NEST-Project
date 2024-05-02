import { Flex } from '@chakra-ui/react'
import {memo} from 'react'

interface props {
    children:JSX.Element[]
};

function HeaderWrapper({children}:props):JSX.Element {
  return (
    <Flex w='90%'
     color='white'
     justifyContent='space-between'
     alignItems='center'
     h='80px' m='auto'>
      {children}
    </Flex>
  )
}

export default memo(HeaderWrapper)