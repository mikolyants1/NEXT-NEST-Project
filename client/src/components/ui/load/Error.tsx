"use client"

import { useEffect, useState,memo } from "react";
import { Flex } from "@chakra-ui/react";

function Error():JSX.Element {
 const [err,setErr] = useState<string>('');

 useEffect(():void=>{
  setInterval(():void => {
   setTimeout(():void=>setErr(''),0);
   setTimeout(():void=>setErr('.'),200);
   setTimeout(():void=>setErr('..'),400);
   setTimeout(():void=>setErr('...'),600);
   }, 800);
  },[]);
  
  return (
    <Flex
     width ='100%'
     justifyContent='center'
     textAlign='center'
     color='white'>
       error {err}
    </Flex>
  );
}

export default memo(Error)