import { updateUser } from "@/api/mutation/user/updateUser";
import { Null } from "@/libs/types/type";
import { updateUserSchema } from "@/libs/types/zod";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  setError:Dispatch<SetStateAction<string>>,
  onClose:()=>void
}

type TForm = Null<FormDataEntryValue>;

export async function updateUserAction({
  setError,onClose
}:IProps,form:FormData):Promise<void> {
  const tag:TForm = form.get("tag");
  const username:TForm = form.get("username");
  const password:TForm = form.get("password");
  if (!tag || !username || !password){
    return setError("all fields shouldn't be empty");
  }
  try {
    const parse = updateUserSchema.safeParse({
      tag,username,password
    });
    if (!parse.data) {
      return setError("inccorect type of data");
    }
    if (parse.data.tag[0] !== "@"){
      return setError("first tag symbol must be @");
    }
    await updateUser({
      tag:parse.data.tag,
      username:parse.data.username,
      password:parse.data.password
    });
   } catch {
    return setError("server error");
   }
   onClose();
}
