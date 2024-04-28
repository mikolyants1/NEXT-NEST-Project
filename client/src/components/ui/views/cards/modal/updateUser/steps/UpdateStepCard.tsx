import { updateUser } from '@/components/api/mutation/user/updateUser';
import { IModalContext, IStore, IUser } from '@/components/libs/types/type';
import { ModalContext } from '@/components/model/context/modal';
import { useStore } from '@/components/model/store/store';
import { Box, Button, Flex, Input } from '@chakra-ui/react';
import React, { useContext, useState } from 'react'

interface IState {
  username:string,
  password:string,
  tag:string
}

function UpdateStepCard():JSX.Element {
  const {id,token,setName,setTag}:IStore = useStore();
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
    
  const submit = async ():void => {
    if (state.tag[0] !== "@"){
      setError("first tag symbol must be @")
    }
    try {
      const res:IUser = await updateUser({
        id,
        token,
        tag:state.tag,
        username:state.username,
        password:state.password
      });
      setName(res.username);
      setTag(state.tag);
    } catch {}
    onClose();
  }

  return (
        <>
          <Box fontSize={20}
           fontWeight="bold"
           color="white">
             {"update your's data"}
          </Box>
          {["username","password","tag"].map((n):JSX.Element =>(
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
             isDisabled={!state.password || !state.username || !state.tag}
             onClick={submit}>
               update
            </Button>
          </Flex>
        </>
      )
    
}

export default UpdateStepCard