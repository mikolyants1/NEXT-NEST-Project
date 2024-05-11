import { getTags } from "@/components/api/query/user/getTags";
import LoginLinks from "@/components/ui/views/login/content/links/LoginLinks";
import LoginCard from "@/components/ui/views/login/LoginCard";
import {type Metadata } from "next";

export const metadata:Metadata = {
  title:"Registration",
  description:"registration page"
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