import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cookies } from 'next/headers';
import { ReactNode } from 'react'


function layout({
    children
}:Readonly<{
    children:ReactNode
}>):JSX.Element {
    const cookieStore:ReadonlyRequestCookies = cookies();
    const userId = cookieStore.has("userId");
    const token = cookieStore.has("token");
    if (!userId || !token){
      redirect("/unauthorized");
    }
  return children;
}

export default layout