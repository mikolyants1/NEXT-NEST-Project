"use client"

import {motion} from 'framer-motion';

interface IProps {
  children:JSX.Element,
  idx:number
}

function UserInviteWrapper({children,idx}:IProps):JSX.Element{
  return (
    <motion.div
     initial={{
      translateX:-300,
      opacity:0
     }}
     animate={{
      translateX:0,
      opacity:1
     }}
     transition={{
      delay:idx * 0.3,
      type:"spring"
     }}>
      {children}
    </motion.div>
  )
}

export default UserInviteWrapper