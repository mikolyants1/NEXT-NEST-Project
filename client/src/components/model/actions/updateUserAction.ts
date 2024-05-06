import { updateUser } from "@/components/api/mutation/user/updateUser";
import { Null } from "@/components/libs/types/type";
import { updateUserSchema } from "@/components/libs/types/zod";
import { revalidatePath } from "next/cache";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  setError:Dispatch<SetStateAction<string>>,
  onClose:()=>void
}

export async function updateUserAction({
    setError,
    onClose
}:IProps,form:FormData):Promise<void> {
  const tag:Null<FormDataEntryValue> = form.get("tag");
  const username:Null<FormDataEntryValue> = form.get("username");
  const password:NUll<FormDataEntryValue> = form.get("password");
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
