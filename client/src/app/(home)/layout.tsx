import ModalLayout from '@/model/layouts/ModalLayout'
import Header from '@/ui/views/home/header/Header'
import { cookies } from 'next/headers'
import {type ReactNode } from 'react'


export default function layout({
    children
}:Readonly<{
    children:ReactNode
}>):JSX.Element {
  const id = cookies().get("userId")?.value;
  return (
    <ModalLayout>
      <Header id={id || ""} />
      {children}
    </ModalLayout>
  )
}