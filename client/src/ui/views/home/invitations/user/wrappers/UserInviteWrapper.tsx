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
      opacity:0,
      scale:0
     }}
     animate={{
      opacity:1,
      scale:1
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