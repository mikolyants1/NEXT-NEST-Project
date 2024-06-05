import { getCookie } from '@/model/hooks/useCookie'
import ModalLayout from '@/model/layouts/ModalLayout'
import Header from '@/ui/views/home/header/Header'
import {type ReactNode } from 'react'


export default function layout({
    children
}:Readonly<{
    children:ReactNode
}>):JSX.Element {
  const id = getCookie("userId");
  return (
    <ModalLayout>
      <Header id={id || ""} />
      {children}
    </ModalLayout>
  )
}