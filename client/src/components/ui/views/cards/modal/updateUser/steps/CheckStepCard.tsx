import { getAccess } from '@/components/api/query/user/getAccess';
import { IStore } from '@/components/libs/types/type';
import { useStore } from '@/components/model/store/store';
import { Box, Button, Flex, Input } from '@chakra-ui/react'
import React, { ChangeEvent, useState } from 'react'

interface IState {
  username:string,
  password:string
}

interface IProps {
    next:()=>void
}

function CheckStepCard({next}:IProps):JSX.Element {
  const {id}:IStore = useStore();
  const [error,setError] = useState<string>("");
  const [state,setState] = useState<IState>({
    username:"",
    password:""
  });

  const change = (e:ChangeEvent<HTMLInputElement>):void => {
    setState((prv:IState) => ({
      ...prv,[e.target.name]:e.target.value
    }));
  }

  const submit = async ():Promise<void> => {
    try {
      const res:boolean = await getAccess({
        id,
        check_name:state.username,
        check_pass:state.password
      });
      if (res) next();
      else setError("incorrect data");
    } catch (e) {
       setError("server error")
    }
  }

  return (
    <>
      <Box fontSize={20}
       fontWeight="bold"
       color="white">
         At first,verify your data
      </Box>
      <Input w="70%"
       bg="rgb(200,200,200)"
       placeholder='username'
       onChange={change}
       name='username'
      />
      <Input w="70%"
       bg="rgb(200,200,200)"
       placeholder='password'
       onChange={change}
       name='password'
      />
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
         isDisabled={!state.password || !state.username}
         onClick={submit}>
           next step
        </Button>
      </Flex>
    </>
  )
}

export default CheckStepCard