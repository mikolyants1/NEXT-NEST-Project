"use client"

import { useDisclosure } from '@chakra-ui/react'
import DrawerCard from './menu/DrawerCard';
import HeaderTitleCard from './title/cards/HeaderTitleCard';
import ModalCard from '../../cards/modal/ModalCard';

function Header():JSX.Element {
  const {onOpen,isOpen,onClose} = useDisclosure();
  
  return (
    <>
      <ModalCard />
      <HeaderTitleCard
       onOpen={onOpen}
       />
      <DrawerCard
       isOpen={isOpen}
       onClose={onClose} 
       />
    </>
  )
}

export default Header