import { userApiQuery } from "@/api/user/userApiQuery";
import { IUser, IUserBody, Null } from "@/libs/types";
import { updateUserSchema } from "@/libs/zod/form";
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
  const { update } = await userApiQuery();
  try {
    const parse = updateUserSchema.safeParse({
      tag,username,password
    });
    if (!parse.data) {
      return setError(parse.error.toString());
    }
    if (tag && parse.data.tag && parse.data.tag[0] !== "@"){
      return setError("first tag symbol must be @");
    }
    await update({
      tag:parse.data.tag || "",
      username:parse.data.username || "",
      password:parse.data.password || ""
    });
  } catch (e) {
    if (e instanceof Error){
      return setError(e.message);
    }
  }
   onClose();
}
