import { getCookie } from '@/model/hooks/getCookie';
import { redirect } from 'next/navigation';
import {use, type ReactNode } from 'react'

function layout({
  children
}:Readonly<{
  children:ReactNode
}>):ReactNode {
  const userId = use(getCookie("userId"));
  const token = use(getCookie("token"));
  if (!userId || !token){
    redirect("/unauthorized");
  }
  return children;
}

export default layout