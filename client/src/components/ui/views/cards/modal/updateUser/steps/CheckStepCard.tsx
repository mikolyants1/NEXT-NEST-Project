import { checkUserAction } from '@/components/model/actions/checkUserAction';
import { Box, Button, Flex, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useFormStatus } from 'react-dom';

interface IProps {
  next:()=>void
}

function CheckStepCard({next}:IProps):JSX.Element {
  const [error,setError] = useState<string>("");
  const {pending} = useFormStatus();
  const checkAction = checkUserAction.bind(null,{
    next,
    setError
  });

  return (
    <form action={checkAction}
     style={{width:"100%"}}>
      <Flex w="100%"
       justifyContent="center"
       flexDir="column" gap={4}
       alignItems="center">
        <Box fontSize={20}
         fontWeight="bold"
         color="white">
          At first,verify your data
        </Box>
        {["username","password"].map((el):JSX.Element => (
          <Input w="70%" key={el}
           bg="rgb(200,200,200)"
           placeholder={el}
           name={el}
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
           isDisabled={pending}
           type="submit">
             next step
          </Button>
        </Flex>
      </Flex>
    </form>
  )
}

export default CheckStepCard