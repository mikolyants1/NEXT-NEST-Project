import { getTags } from "@/api/query/user/getTags";
import LoginLinks from "@/ui/views/login/content/links/LoginLinks";
import LoginCard from "@/ui/views/login/LoginCard";
import {type Metadata } from "next";

export const metadata:Metadata = {
  title:"Registration",
  description:"registration page",
  keywords:"registrating in karma's duary, create user"
}

export default async function Regist():Promise<JSX.Element>{
  const tags:string[] = await getTags();

  return (
    <LoginCard
     isHome={false}
     tags={tags}>
      <LoginLinks isHome={false} />
    </LoginCard>
  );
}