import { getCookie } from '@/model/hooks/useCookie';
import { redirect } from 'next/navigation';
import {type ReactNode } from 'react'

function layout({
  children
}:Readonly<{
  children:ReactNode
}>):ReactNode {
  const userId = getCookie("userId");
  const token = getCookie("token");
  if (!userId || !token){
    redirect("/unauthorized");
  }
  
  return children;
}

export default layout