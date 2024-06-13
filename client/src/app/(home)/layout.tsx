import { userApiQuery } from '@/api/user/userApiQuery';
import { getCookie } from '@/model/hooks/getCookie'
import ModalLayout from '@/model/layouts/ModalLayout'
import Header from '@/ui/views/home/header';
import {use, type ReactNode } from 'react'


export default function layout({
    children
}:Readonly<{
    children:ReactNode
}>):JSX.Element {
  const id = use(getCookie("userId"));
  
  return (
    <ModalLayout>
      <Header id={id || ""} />
      {children}
    </ModalLayout>
  )
}