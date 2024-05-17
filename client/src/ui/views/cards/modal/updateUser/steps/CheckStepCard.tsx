import { checkUserAction } from '@/model/actions/checkUserAction';
import { Button, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useFormStatus } from 'react-dom';

interface IProps {
  next:()=>void
}

function CheckStepCard({next}:IProps):JSX.Element {
  const [error,setError] = useState<string>("");
  const {pending} = useFormStatus();
  const checkAction = checkUserAction.bind(null,{next,setError});

  return (
    <form action={checkAction}
     style={{width:"100%"}}>
      <div className="w-[100%] flex justify-center flex-col items-center gap-4">
        <div className="text-xl font-bold text-white">
          At first,verify your data
        </div>
        {["username","password"].map((el):JSX.Element => (
          <Input w="70%" key={el}
           bg="rgb(200,200,200)"
           placeholder={el}
           name={el}
        />
        ))}
        {error && (
          <div className="w-[100%] text-center text-red-600 text-xl">
            {error}
          </div>
        )}
        <div className="w-[70%] mb-5 flex justify-end">
          <Button colorScheme='blue'
           isDisabled={pending}
           type="submit">
             next step
          </Button>
        </div>
      </div>
    </form>
  )
}

export default CheckStepCard