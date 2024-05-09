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
    <Box w={styles.getSize("w",size)}
     onClick={ allow ? () => router.push(
      isHeader ? `/main/${id}/profile` : `/main/${id}`
     ) : () => null}
     background={`linear-gradient(45deg,${one},${two})`}
     boxSizing="border-box" color="white"
     textAlign='center' borderRadius='50%'
     fontSize={styles.getSize("fs",size)}
     p={styles.getSize("p",size)}
     h={styles.getSize("h",size)}
     fontWeight="bold">
      {lett.toUpperCase()}
    </Box>
  );
}

export default memo(LogoCard);