"use client"

import {type ILogo} from '@/components/libs/types/type';
import { Box } from '@chakra-ui/react';
import React, { memo } from 'react'
import { createLogo } from '@/components/model/functions/create/logo';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { styles } from '@/components/libs/style/style';

interface IProps {
  username:string,
  id?:string,
  isHeader?:boolean,
  allow:boolean,
  size:"xs"|"xl"
}

function LogoCard({username,id,size,isHeader,allow}:IProps):JSX.Element {
 const router:AppRouterInstance = useRouter();
 const lett:string = username.slice(0,1) || "";
 const {one,two}:ILogo = createLogo();
 
  return (
    <div className="text-center box-border rounded-[50%] font-bold text-white"
     onClick={ allow ? () => router.push(
      isHeader ? `/main/${id}/profile` : `/main/${id}`
     ) : () => null}
     style={{
       background:`linear-gradient(45deg,${one},${two})`,
       width:styles.getSize("w",size),
       height:styles.getSize("h",size),
       padding:styles.getSize("p",size),
       fontSize:styles.getSize("fs",size)
     }}>
      {lett.toUpperCase()}
    </div>
  );
}

export default memo(LogoCard);