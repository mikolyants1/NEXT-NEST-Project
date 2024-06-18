'use client'

import {type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import {type ChangeEvent, useCallback, useMemo, useState } from 'react';
import { FormProvider,type SubmitHandler, useForm } from 'react-hook-form';
import LoginButton from './content/buttons/LoginButtons';
import LoginErrorCard from './content/error/LoginErrorCard';
import {ICheckBody, IUser, IUserBody, type ICheckRes,type IFields} from '@/libs/types';
import { createFields } from '@/model/functions/maps/fields';
import LoginInputs from './content/inputs/LoginInputs';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkLoginSchema } from '@/libs/types/zod';
import { z } from 'zod';
import { userApiQuery } from '@/api/user/userApiQuery';
import { authApiQuery } from '@/api/auth/authApiQuery';

interface IProps {
  isHome:boolean,
  tags?:string[],
  children:JSX.Element
}

type TForm = z.infer<typeof checkLoginSchema>;

export default function LoginCard({isHome,tags,children}:IProps):JSX.Element {
 const router:AppRouterInstance = useRouter();
 const [error,setError] = useState<string>("");
 const form = useForm<TForm>({
  defaultValues:{
    username:"",
    password:"",
    tag:""
  },
  resolver:zodResolver(checkLoginSchema)
 });
 
 const onSubmit:SubmitHandler<TForm> = async (values):Promise<void> => {
  const isTag = isHome ? !values.tag : values.tag;
  const parseUser = checkLoginSchema.safeParse(values);
  if (parseUser.error){
    return setError("invalid types of fields");
  }
  const { username, password, tag } = parseUser.data;
  if (!username || !password || !isTag){
    setError("all fields shouldn't be empty");
    return;
  }
  try {
    const check = await authApiQuery<ICheckRes,ICheckBody>(
      "login",{username,password,isLogin:isHome}
    );
    if (!check.success){
      setError(check.message);
      form.reset();
      return;
    };
    if (isHome) router.push(`/main/${check.id}`);
    else {
      const trimTag = tag?.trim().toLowerCase() || "";
      if (trimTag[0] !== "@"){
        setError("first symbol should be @");
        return;
      }
      if (tags?.some(t => t == trimTag)){
        setError("tag should be unique");
        return;
      }
      await userApiQuery<IUser,IUserBody>("create",{
        username,password,tag:trimTag
      });
    }
  } catch(e) {
    if (e instanceof Error){
    return setError(e.message);
    }
    form.reset();
  }
 }
 
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
       className="w-[400px] mr-auto ml-auto mt-20 bg-[rgb(90,90,90)]
       text-white absolute right-0 left-0 min-h-75 rounded-xl overflow-hidden">
        <div className="text-3xl font-bold text-center mt-[10px] ">
          {isHome ? "Entrance" : "Registration"}
        </div>
        {createFields(isHome).map((i:IFields):JSX.Element=>(
          <LoginInputs key={i.name} {...i} />
        ))}
        <LoginButton isHome={isHome} />
        <LoginErrorCard error={error} />
          {children}
      </form>
    </FormProvider>
  )
};