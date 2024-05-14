'use client'

import {type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { FormProvider,type SubmitHandler, useForm } from 'react-hook-form';
import LoginButton from './content/buttons/LoginButtons';
import LoginErrorCard from './content/error/LoginErrorCard';
import {type ICheckRes,type IFields,type TForm} from '@/components/libs/types/type';
import { createFields } from '@/components/model/functions/maps/fields';
import LoginInputs from './content/inputs/LoginInputs';
import { checkUser } from '@/components/api/query/user/checkUser';
import { createUser } from '@/components/api/mutation/user/createUser';
import { response } from '@/components/model/functions/compare/response';

interface IProps {
  isHome:boolean,
  tags?:string[],
  children:JSX.Element
}

export default function LoginCard({isHome,tags,children}:IProps):JSX.Element {
 const [errArray,setErrArray] = useState<string[]>([]);
 const hashArray:string[] = useMemo(() => errArray,[errArray]);
 const router:AppRouterInstance = useRouter();
 const [error,setError] = useState<string>("");
 const methods = useForm<TForm>({
  defaultValues:{username:"",password:"",tag:""}
 });
 const fields:IFields[] = createFields(isHome);

 const submit:SubmitHandler<TForm> = async ({
   username,password,tag
 }):Promise<void> => {
  setErrArray([]);
  const isTag = isHome || tag;
  if (!username) errorHandler("name");
  if (!password) errorHandler("pass");
  if (!isHome && !tag) errorHandler("tag");
  if (!username || !password || !isTag){
    setError("all fields shouldn't be empty");
    return;
  }
  try {
    const check:ICheckRes = await checkUser({
      username,password,isLogin:isHome
    });
    if (response(check.id,isHome)){
      setError("username should be unique");
      methods.reset();
      return;
    };
    if (isHome) router.push(`/main/${check.id}`);
    else {
      const trimTag = tag.trim().toLowerCase();
      if (trimTag[0] !== "@"){
        setError("first symbol should be @");
        return;
      }
      if (tags?.some(t => t == trimTag)){
        setError("tag should be unique");
        return;
      }
      createUser({username,password,tag:trimTag});
    }
  } catch(e) {
    console.log(e);
    setError("login error");
    methods.reset();
  }
 }
 
 const errorHandler = (value:string):void => {
  setErrArray((prv:string[])=>([
    ...prv,value
  ]));
 }

 const focus = useCallback((e:ChangeEvent<HTMLInputElement>):void => {
   const newArrArray:string[] = errArray
   .filter((i:string)=>i !== e.target.name);
   setErrArray(newArrArray);
 },[errArray]);

  return (
    <FormProvider {...methods}>
      <div className="w-[400px] mr-auto ml-auto mt-20 bg-[rgb(90,90,90)] text-white absolute right-0 left-0 min-h-75 rounded-xl overflow-hidden">
        <div className="text-3xl font-bold text-center mt-[10px] ">
          {isHome ? "Entrance" : "Registration"}
        </div>
        <>
         {fields.map((i:IFields):JSX.Element=>(
           <LoginInputs
            key={i.name}
            err={hashArray}
            focus={focus}
            {...i}
           />
          ))}
        </>
         <LoginButton
          isHome={isHome}
          submit={submit}
          />
        <LoginErrorCard error={error} />
          {children}
      </div>
    </FormProvider>
  )
};