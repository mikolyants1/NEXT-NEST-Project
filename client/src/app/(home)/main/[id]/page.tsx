import { getUserTasks } from "@/components/api/query/task/getUserTasks";
import { getUser } from "@/components/api/query/user/getUser";
import { ITask, IUser } from "@/components/libs/types/type";
import UserTaskMapCard from "@/components/ui/views/home/main/tasks/UserTaskMapCard";
import UserTitleCard from "@/components/ui/views/home/main/user/UserTitleCard";
import { Flex } from "@chakra-ui/react";
import { Metadata } from "next";

interface IProps {
    params:{
      id:string
    }
}
export const metadata:Metadata = {
  title:"Main",
  description:"Main page"
}

async function page({params}:IProps):Promise<JSX.Element> {
  const tasks:ITask[] = await getUserTasks(params.id);
  const user:IUser = await getUser(params.id);

  return (
    <Flex w="100%" mt={10}
     justifyContent="center"
     alignItems="center"
     flexDir="column">
      <UserTitleCard
       userId={params.id}
       username={user.username}
      />
      <UserTaskMapCard
       tasks={tasks}
       userId={params.id}
       />
    </Flex>
  );
}

export default page;
