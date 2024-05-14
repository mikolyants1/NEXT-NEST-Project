"use client"

import { Spinner } from "@chakra-ui/react";
import { memo } from "react";

function Loader():JSX.Element { 
  return (
    <div className="w-[100%] flex mt-[70px] justify-center">
       <Spinner
        margin="10px auto"
        thickness='4px'
        speed='0.65s'
        emptyColor='rgb(230,230,230)'
        color='blue.500'
        size='xl'
       />
    </div>
  );
}
export default memo(Loader);