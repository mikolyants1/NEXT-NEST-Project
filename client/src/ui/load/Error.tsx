"use client"

import { useEffect, useState,memo } from "react";

function Error():JSX.Element {
 const [err,setErr] = useState<string>('');

 useEffect(() => {
  setInterval(() => {
   setTimeout(() => setErr(''), 0);
   setTimeout(() => setErr('.'), 200);
   setTimeout(() => setErr('..'), 400);
   setTimeout(() => setErr('...'), 600);
   }, 800);
  },[]);
  
  return (
    <div className="w-[100%] justify-center text-center text-black flex">
       error {err}
    </div>
  );
}

export default memo(Error)