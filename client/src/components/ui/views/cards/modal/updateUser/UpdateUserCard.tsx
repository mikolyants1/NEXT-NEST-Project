import { IModalContext } from '@/components/libs/types/type'
import { ModalContext } from '@/components/model/context/modal'
import { Flex } from '@chakra-ui/react';
import React, { useCallback, useContext, useState } from 'react'
import CheckStepCard from './steps/CheckStepCard';
import UpdateStepCard from './steps/UpdateStepCard';

function UpdateUserCard():JSX.Element {
  const {state} = useContext<IModalContext>(ModalContext);
  const [step,setStep] = useState<number>(0);
  
  return (
    <Flex w="100%"
     justifyContent="center"
     flexDir="column" gap={4}
     alignItems="center">
      {step == 0 && (
        <CheckStepCard
         next={() => setStep(1)}
         />
      )}
      {step == 1 && <UpdateStepCard />}
    </Flex>
  )
}

export default UpdateUserCard