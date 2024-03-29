'use client'

import { ICheck,IStore,Mutate,fields,form } from '@/components/types/type'
import LoginInputs from '@/components/ui/inputs/LoginInputs'
import { Box,} from '@chakra-ui/react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import LoginErrorCard from './LoginErrorCard'
import LoginButton from '../../buttons/login/LoginButtons'
import { useStore } from '@/components/store/store'
import { useMutation, useQueryClient,QueryClient } from '@tanstack/react-query'
import addUser from '@/components/helpers/api/mutation/user/addUser'
import { IUsers } from '@/components/types/type'
import { response } from '@/components/helpers/functions/compare/response'
import checkUsers from '@/components/helpers/api/query/user/checkUsers'
import LoginCardWrapper from '../../wrappers/LoginCardWrapper'
import { createFields } from '@/components/helpers/functions/create/maps/fileds'

interface props {
  isHome:boolean,
  children:JSX.Element
};

type MutateArg = Omit<IUsers,"_id"|"films">;


export default function LoginCard({isHome,children}:props):JSX.Element {
 const [errArray,setErrArray] = useState<string[]>([]);
 const hashArray:string[] = useMemo(()=>errArray,[errArray]);
 const router:AppRouterInstance = useRouter();
 const [error,setError] = useState<boolean>(false);
 const {invalidateQueries}:QueryClient = useQueryClient();
 const {mutate:add} = useMutation<unknown,IUsers,MutateArg>({
    mutationFn:(body:MutateArg)=>addUser(body),
    onSuccess:()=>invalidateQueries({queryKey:['users']})
  })
 const {setName,setId,setToken,setRole}:IStore = useStore();
 const methods = useForm<form>({
  defaultValues:{name:"",pass:""}
 });
 const fields:fields[] = createFields();

 const submit:SubmitHandler<form> = async (date):Promise<void> => {
  setErrArray([]);
  if (!date.name) errorHandler("name");
  if (!date.pass) errorHandler("pass");
  if (!date.name || !date.pass) return;
  try {
    const check:ICheck = await checkUsers(date);
    if (response(check._id,isHome)){
      setError(true);
      methods.reset();
      return;
    };
    if (isHome){
      setName(date.name);
      setId(check._id);
      setToken(check.token);
      setRole(check.role);
      router.push(`/home/profile/${check._id}`);
    } else add(date);
  } catch(e) {
    console.log(e);
    setError(true);
    methods.reset();
  };
 };
 
 const errorHandler = (value:string):void => {
  setErrArray((prv:string[])=>([
    ...prv,value
  ]));
 };

 const focus = useCallback((e:ChangeEvent<HTMLInputElement>):void => {
   const newArrArray:string[] = errArray
   .filter((i:string)=>i !== e.target.name);
   setErrArray(newArrArray);
 },[errArray]);

  return (
    <FormProvider {...methods}>
      <LoginCardWrapper>
        <Box fontSize={25}
         fontWeight='bold'
         textAlign='center'
         mt={5}>
          {isHome ? "Entrance" : "Registration"}
        </Box>
        <>
         {fields.map((i:fields):JSX.Element=>(
           <LoginInputs
            key={i.Name}
            title={i.title}
            Name={i.Name}
            err={hashArray}
            focus={focus}
           />
          ))}
        </>
         <LoginButton
          isHome={isHome}
          submit={submit}
          />
        <LoginErrorCard error={error} />
          {children}
      </LoginCardWrapper>
    </FormProvider>
  )
};