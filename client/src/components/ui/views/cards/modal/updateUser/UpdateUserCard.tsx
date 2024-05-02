import { Flex } from '@chakra-ui/react';
import { useState } from 'react'
import CheckStepCard from './steps/CheckStepCard';
import UpdateStepCard from './steps/UpdateStepCard';

function UpdateUserCard():JSX.Element {
  const [step,setStep] = useState<boolean>(false);
  
  return (
    <Flex w="100%"
     justifyContent="center"
     flexDir="column" gap={4}
     alignItems="center">
      {step && (
        <CheckStepCard
         next={() => setStep(true)}
         />
      )}
      {step && <UpdateStepCard />}
    </Flex>
  )
}

export default UpdateUserCard