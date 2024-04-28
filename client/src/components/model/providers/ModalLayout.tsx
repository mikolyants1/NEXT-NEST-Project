"use client"

import { ReactNode, useReducer } from "react"
import { ModalContext } from "../context/modal"
import { modalReducer, modalState } from "../reducers/modalReducer"
import { useDisclosure } from "@chakra-ui/react"

function ModalLayout({
  children
}:Readonly<{
  children:ReactNode
}>):JSX.Element {
  const [state,dispatch] = useReducer(modalReducer,modalState);
  const {isOpen,onClose,onOpen} = useDisclosure();

  return (
    <ModalContext.Provider value={{
      isOpen,
      state,
      dispatch,
      onClose,
      onOpen
    }}>
        {children}
    </ModalContext.Provider>
  )
}

export default ModalLayout