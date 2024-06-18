import { authApiQuery } from "@/api/auth/authApiQuery";
import {IAccessBody, type Null } from "@/libs/types";
import { checkUserSchema } from "@/libs/zod/form";
import {type Dispatch,type SetStateAction } from "react";

interface IProps {
  next:() => void,
  setError:Dispatch<SetStateAction<string>>
}

type TForm = Null<FormDataEntryValue>;

export async function checkUserAction({
  next,setError
}:IProps,formData:FormData):Promise<void> {
  try {
    const username:TForm = formData.get("username");
    const password:TForm = formData.get("password");
    if (!username || !password){
      return setError("all fields shouldn't be empty");
    }
    const parse = checkUserSchema.safeParse({
      username,
      password
    });
    if (!parse.data) {
      return setError("inccorect type of data");
    }
    const res = await authApiQuery<boolean,IAccessBody>(
     "access",{
       check_name:parse.data.username,
       check_pass:parse.data.password
    });
    if (res) next();
    else return setError("incorrect data");
  } catch {
    return setError("server error");
  }
}