import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react'

function layout({
  children
}:Readonly<{
  children:ReactNode
}>):ReactNode {
    const userId = cookies().has("userId");
    const token = cookies().has("token");
    if (!userId || !token){
      redirect("/unauthorized");
    }
  return children;
}

export default layout