import { updateUser } from '@/components/api/mutation/user/updateUser';
import {type IModalContext } from '@/components/libs/types/type';
import { updateUserAction } from '@/components/model/actions/updateUserAction';
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
  const updateAction = updateUserAction.bind(null,{
    onClose,
    setError
  });

  return (
      <form action={updateAction}
       style={{width:"100%"}}>
        <Flex w="100%"
         justifyContent="center"
         flexDir="column" gap={4}
         alignItems="center">
          <Box fontSize={20}
           fontWeight="bold"
           color="white">
            {"update your's data"}
          </Box>
          {["username","password","tag"].map((n):JSX.Element => (
            <Input key={n} w="70%"
             bg="rgb(200,200,200)"
             placeholder={n}
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
             type='submit'>
               update
            </Button>
          </Flex>
        </Flex>
      </form>
    );
}

export default UpdateStepCard