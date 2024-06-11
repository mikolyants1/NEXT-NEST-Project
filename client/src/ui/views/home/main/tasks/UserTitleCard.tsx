"use client"

import {motion} from 'framer-motion';

interface IProps {
  adminId:string,
  userId:string,
  username:string
}

function UserTitleCard({adminId,userId,username}:IProps):JSX.Element {
  const master = `${adminId == userId ? "Your" : username}'s`;
  const text = `${master} task list`;

  return (
    <div className="text-2xl font-bold flex">
      {text.split("").map((el:string,idx:number):JSX.Element => (
      <motion.div key={idx}
       initial={{opacity:0,translateY:20}}
       animate={{opacity:1,translateY:0}}
       transition={{delay:idx * 0.1,type:"spring"}}
       style={{marginLeft:el == " " ? 6 : 0}}>
        {el}
      </motion.div>
      ))}
    </div>
  )
}

export default UserTitleCard