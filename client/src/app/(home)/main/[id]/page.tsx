import { taskApiQuery } from "@/api/task/taskApiQuery";
import { userApiQuery } from "@/api/user/userApiQuery";
import {type ITask,type IUser } from "@/libs/types";
import { getCookie } from "@/model/hooks/getCookie";
import UserTaskMapCard from "@/ui/views/home/main/tasks/UserTaskMapCard";
import UserTitleCard from "@/ui/views/home/main/tasks/UserTitleCard";
import {type Metadata } from "next";

interface IProps {
  params:{
    id:string
  }
}
export const metadata:Metadata = {
  title:"Main",
  description:"Main page",
  keywords:"create tasks, delete tasks, update tasks, create invitations,see user's friends",
}

export const revalidate = 3600;

async function page({params}:IProps):Promise<JSX.Element> {
  const adminId = await getCookie("userId");
  const tasks = await taskApiQuery<ITask[],string>(
    "find",params.id
  );
  const user = await userApiQuery<IUser,string>(
    "findById",params.id
  );
  
  return (
    <main className="flex w-[100%] mt-10 justify-center items-center flex-col">
      <UserTitleCard
       userId={user.id}
       username={user.username}
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
