import { Button, Input, useMediaQuery } from '@chakra-ui/react'
import {type ChangeEvent, useState } from 'react'

interface IProps {
  add:(text:string) => Promise<void>
}

function CommInputCard({add}:IProps):JSX.Element {
  const [isWidth] = useMediaQuery('(max-width: 700px)');
  const [comment,setCommment] = useState<string>("");

  const change = (e:ChangeEvent<HTMLInputElement>):void => {
    setComment(e.target.value);
  }
  return (
    <div style={{width:isWidth ? "100%" : "80%"}}
     className="mt-10 ml-auto mr-auto justify-center items-center flex">
      <Input w='100%'
       onChange={change}
       bg="rgb(200,200,200)"
       placeholder="write comment"
       borderRightRadius={0}
       />
      <Button minW="80px"
       colorScheme="blue"
       borderLeftRadius={0}
       onClick={() => add(comment)}>
        add
      </Button>
    </div>
  )
}

export default CommInputCard