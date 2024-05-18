import { getUserTasks } from "@/api/query/task/getUserTasks";
import { getUser } from "@/api/query/user/getUser";
import {type ITask,type IUser } from "@/libs/types/type";
import UserTaskMapCard from "@/ui/views/home/main/tasks/UserTaskMapCard";
import UserTitleCard from "@/ui/views/home/main/tasks/UserTitleCard";
import {type Metadata } from "next";
import { cookies } from "next/headers";

interface IProps {
  params:{
    id:string
  }
}
export const metadata:Metadata = {
  title:"Main",
  description:"Main page"
}

export const revalidate = 3600;

async function page({params}:IProps):Promise<JSX.Element> {
  const adminId = cookies().get("userId")?.value;
  const tasks:ITask[] = await getUserTasks(params.id);
  const {id,username}:IUser = await getUser(params.id);
  
  return (
    <main className="flex w-[100%] mt-10 justify-center items-center flex-col">
      <UserTitleCard
       userId={id}
       username={username}
       adminId={adminId || ""}
      />
      <UserTaskMapCard
       tasks={tasks}
       userId={params.id}
       adminId={adminId || ""}
       />
    </main>
  );
}

export default page;
