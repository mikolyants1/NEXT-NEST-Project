"use client"

import { useStore } from '@/components/model/store/store';
import {type ILogo,type IStore } from '@/components/libs/types/type';
import { Box } from '@chakra-ui/react';
import React, { memo } from 'react'
import { createLogo } from '@/components/model/functions/create/logo';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ERoles } from '@/components/libs/enums/enum';

interface IProps {
  username:string,
  id?:string,
  isHeader?:boolean,
  allow:boolean,
  size:"xs"|"xl"
}
function LogoCard({username,id,size,isHeader,allow}:IProps):JSX.Element {
 const router:AppRouterInstance = useRouter();
 const lett:string = username.slice(0,1).toUpperCase() || "";
 const {one,two}:ILogo = createLogo();
 const {id:userId}:IStore = useStore();
 const role = userId == id ? ERoles.ADMIN : ERoles.GUEST;

  return (
    <Box w={size == "xl" ? "80px" : 12}
     onClick={ allow ? () => router.push(
      isHeader ? `/main/${id}/profile/${role}` : `/main/${id}`
     ) : null}
     background={`linear-gradient(45deg,${one},${two})`}
     textAlign='center' borderRadius='50%'
     fontSize={size == "xl" ? 37 : 21}
     boxSizing="border-box"
     p={size == "xl" ? "13px" : "8px"}
     h={size == "xl" ? "80px" : 12}
     color="white" fontWeight="bold">
      {lett}
    </Box>
  )
}

export default memo(LogoCard)