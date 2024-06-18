import {type TForm } from '@/libs/types';
import { Button } from '@chakra-ui/react';
import {type SubmitHandler, useFormContext } from 'react-hook-form';

interface IProps {
  isHome:boolean
};

function LoginButton({isHome}:IProps):JSX.Element {
 const {formState} = useFormContext<TForm>();
  return (
    <div className="flex mt-2 justify-center">
     <Button w={150}
      colorScheme='green'
      type="submit"
      isDisabled={formState.isLoading}
      mt={2} mb={1}>
       {isHome ? 'login' : 'regist'}
     </Button>
   </div>
  )
}

export default LoginButton