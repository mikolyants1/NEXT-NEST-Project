import { getAccess } from "@/components/api/query/user/getAccess";
import { Null } from "@/components/libs/types/type";
import { checkUserSchema } from "@/components/libs/types/zod";
import { revalidatePath } from "next/cache";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  next:() => void,
  setError:Dispatch<SetStateAction<string>>
}

export async function checkUserAction({
   next,setError
}:IProps,formData:FormData):Promise<void> {
  try {
    const username:Null<FormDataEntryValue> = formData.get("username");
    const password:Null<FormDataEntryValue> = formData.get("password");
    if (!username || !password){
      return setError("all fields shouldn't be empty");
    }
    const parse = checkUserSchema.safeParse({
      username,password
    });
    if (!parse.data) {
      return setError("inccorect type of data");
    }
    const res = await getAccess({
      check_name:parse.data.username,
      check_pass:parse.data.password
    });
    if (res) next();
    else return setError("incorrect data");
  } catch (e) {
    return setError("server error");
  }
}