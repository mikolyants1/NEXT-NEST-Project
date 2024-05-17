import {type IModalContext } from '@/libs/types/type';
import { updateUserAction } from '@/model/actions/updateUserAction';
import { ModalContext } from '@/model/context/modal';
import { Button, Input } from '@chakra-ui/react';
import { useContext, useState } from 'react'

function UpdateStepCard():JSX.Element {
  const {onClose} = useContext<IModalContext>(ModalContext);
  const [error,setError] = useState<string>("");
  const updateAction = updateUserAction.bind(null,{
    onClose,
    setError
  });

  return (
      <form action={updateAction}
       style={{width:"100%"}}>
        <div className="w-[100%] flex justify-center gap-4 flex-col items-center">
          <div className="text-xl text-white font-bold">
            {"update your's data"}
          </div>
          {["username","password","tag"].map((n):JSX.Element => (
            <Input key={n} w="70%"
             bg="rgb(200,200,200)"
             placeholder={n}
             name={n}
             />
          ))}
          {error && (
           <div className="w-[100%] text-center text-red-600 text-xl">
             {error}
           </div>
          )}
          <div className="w-[70%] mb-5 flex justify-end">
            <Button colorScheme='blue'
              type="submit">
               update
            </Button>
          </div>
        </div>
      </form>
    );
}

export default UpdateStepCard