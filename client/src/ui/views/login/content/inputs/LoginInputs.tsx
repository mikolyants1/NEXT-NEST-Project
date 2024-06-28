import { type TForm } from "@/libs/types";
import { Input } from "@chakra-ui/react";
import { memo } from "react";
import { Controller, useFormContext} from 'react-hook-form'

interface IProps {
   name:keyof TForm,
   idx:number
}

function LoginInput({name,idx}:IProps):JSX.Element{
  const {control,formState} = useFormContext<TForm>();
  
  return (
    <div className="w-[90%] align-center flex-column flex mt-5 mr-auto ml-auto">
      <Controller
       control={control}
       name={name}
       render={({field}):JSX.Element => (
        <Input w='100%'
         variant="flushed"
         tabIndex={idx}
         isInvalid={!!formState.errors[`${name}`]}
         color={formState.errors[`${name}`] ? "red" : "white"}
         placeholder={name}
         _placeholder={{color:formState.errors[`${name}`] ? "red" : "white"}}
         {...field}
         />
        )}
       />
    </div>
   )
}

export default memo(LoginInput);