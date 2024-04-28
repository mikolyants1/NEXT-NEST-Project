import { type TForm } from "@/components/libs/types/type";
import { Flex, Input } from "@chakra-ui/react";
import { ChangeEvent, memo } from "react";
import { Controller, useFormContext} from 'react-hook-form'

interface IProps {
   name:keyof TForm,
   err:string[],
   focus:(e:ChangeEvent<HTMLInputElement>)=>void
}

function LoginInput({name,err,focus}:IProps):JSX.Element{
  const {control} = useFormContext<TForm>();
  const invalid:boolean = err.some((i:string)=>i == name);
  const color:string = invalid ? "red" : "white";
    return (
       <Flex w='90%'
         alignItems='center'
         flexDirection='column'
         m='20px auto'>
          <Controller
           control={control}
           name={name}
           render={({field}):JSX.Element=>(
            <Input w='100%'
             variant="flushed"
             isInvalid={invalid}
             color={color}
             placeholder={name}
             _placeholder={{color}}
             onFocus={focus}
             {...field}
            />
           )}
          />
       </Flex>
    )
}

export default memo(LoginInput);