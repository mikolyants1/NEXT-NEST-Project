"use client"

import { useDisclosure } from '@chakra-ui/react'
import DrawerCard from './menu/DrawerCard';
import HeaderTitleCard from './title/cards/HeaderTitleCard';
import ModalCard from '../../cards/modal';

interface IProps {
  id:string
}

function Header({id}:IProps):JSX.Element {
  const {onOpen,isOpen,onClose} = useDisclosure();
  
  return (
    <>
      <ModalCard />
      <HeaderTitleCard
       onOpen={onOpen}
       id={id}
       />
      <DrawerCard
       isOpen={isOpen}
       onClose={onClose} 
       />
    </>
  )
}

export default Header