import { updateUser } from '@/components/api/mutation/user/updateUser';
import {type IModalContext } from '@/components/libs/types/type';
import { ModalContext } from '@/components/model/context/modal';
import { Box, Button, Flex, Input } from '@chakra-ui/react';
import React, { ChangeEvent, useContext, useState } from 'react'

interface IState {
  username:string,
  password:string,
  tag:string
}

function UpdateStepCard():JSX.Element {
  const {onClose} = useContext<IModalContext>(ModalContext);
  const [error,setError] = useState<string>("");
  const [state,setState] = useState<IState>({
    username:"",
    password:"",
    tag:""
  });

  const change = (e:ChangeEvent<HTMLInputElement>):void => {
    setState((prv:IState) => ({
     ...prv,[e.target.name]:e.target.value
    }));
  }
    
  const submit = async ():Promise<void> => {
    if (state.tag[0] !== "@"){
      setError("first tag symbol must be @")
    }
    try {
      await updateUser({
        tag:state.tag,
        username:state.username,
        password:state.password
      });
    } catch {
      setError("server error");
    }
    onClose();
  }

  return (
        <>
          <Box fontSize={20}
           fontWeight="bold"
           color="white">
             {"update your's data"}
          </Box>
          {["username","password","tag"].map((n):JSX.Element => (
            <Input key={n} w="70%"
             bg="rgb(200,200,200)"
             placeholder={n}
             onChange={change}
             name={n}
            />
          ))}
          {error && (
           <Box w="100%"
            textAlign="center"
            fontSize={18}
            color="red">
            {error}
          </Box>
          )}
          <Flex w="70%" mb={5}
           justifyContent="end">
            <Button colorScheme='blue'
             isDisabled = {
              !state.password ||
              !state.username ||
              !state.tag
            }
             onClick={submit}>
               update
            </Button>
          </Flex>
        </>
      )
    
}

export default UpdateStepCard