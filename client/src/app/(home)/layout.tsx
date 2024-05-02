import ModalLayout from '@/components/model/providers/ModalLayout'
import Header from '@/components/ui/views/home/header/Header'
import { cookies } from 'next/headers'
import { ReactNode, use } from 'react'

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