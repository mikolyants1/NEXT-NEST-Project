import ModalLayout from '@/components/model/layouts/ModalLayout'
import Header from '@/components/ui/views/home/header/Header'
import { cookies } from 'next/headers'
import { ReactNode } from 'react'

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