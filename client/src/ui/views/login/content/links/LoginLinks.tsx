import Link from 'next/link';
import {memo} from 'react';

interface IProps {
  isHome:boolean
}

function LoginLink({isHome}:IProps):JSX.Element {
  const href:string = isHome ? '/sign-up' : '/';
  const text:string = isHome ? 'registration' : 'back';
  return (
    <div className="mt-[10px] text-center">
     <Link href={href}>
      {text}
     </Link>
   </div>
  )
}

export default memo(LoginLink)