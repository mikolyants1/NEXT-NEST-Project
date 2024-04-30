import ModalLayout from '@/components/model/layouts/ModalLayout'
import Header from '@/components/ui/views/home/header/Header'
import { ReactNode } from 'react'

export default function layout({
    children
}:Readonly<{
    children:ReactNode
}>):JSX.Element {
  return (
    <ModalLayout>
     <Header />
     {children}
    </ModalLayout>
  )
}