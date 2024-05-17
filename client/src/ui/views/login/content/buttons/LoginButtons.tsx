import {type TForm } from '@/libs/types/type';
import { Button } from '@chakra-ui/react';
import {type SubmitHandler, useFormContext } from 'react-hook-form';

interface IProps {
  isHome:boolean,
  submit:SubmitHandler<TForm>
};

function LoginButton({isHome,submit}:IProps):JSX.Element {
 const {handleSubmit} = useFormContext<TForm>();
  return (
    <div className="flex mt-2 justify-center">
     <Button w={150}
      colorScheme='green'
      onClick={handleSubmit(submit)}
      mt={2} mb={1}>
       {isHome ? 'login' : 'regist'}
     </Button>
   </div>
  )
}

export default LoginButton