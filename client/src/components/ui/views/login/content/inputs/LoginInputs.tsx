import { type TForm } from "@/components/libs/types/type";
import { Flex, Input } from "@chakra-ui/react";
import {type ChangeEvent, memo } from "react";
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
       <div className="w-[90%] align-center flex-column flex mt-5 mr-auto ml-auto">
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
       </div>
    )
}

export default memo(LoginInput);