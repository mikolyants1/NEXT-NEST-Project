"use client"

import {type ILogo} from '@/libs/types';
import { memo } from 'react'
import { createLogo } from '@/model/functions/create/logo';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { styles } from '@/libs/style/style';

interface IProps {
  username:string,
  id?:string,
  isHeader?:boolean,
  allow:boolean,
  size:"xs"|"xl"
}

function LogoCard({username,id,size,isHeader,allow}:IProps):JSX.Element {
 const router:AppRouterInstance = useRouter();
 const upName:string = username.slice(0,1) || "";
 const {one,two}:ILogo = createLogo();
 
  return (
    <div className="text-center box-border rounded-[50%] font-bold text-white"
     onClick={() => {
      if (!allow) return;
      router.push(`/main/${id}/${isHeader ? "profile" : ""}`);
    }}
     style={{
       background:`linear-gradient(45deg,${one},${two})`,
       width:styles.getSize("w",size),
       height:styles.getSize("h",size),
       padding:styles.getSize("p",size),
       fontSize:styles.getSize("fs",size)
     }}>
      {upName.toUpperCase()}
    </div>
  );
}

export default memo(LogoCard);