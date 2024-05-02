import { getUserTasks } from "@/components/api/query/task/getUserTasks";
import { getUser } from "@/components/api/query/user/getUser";
import { ITask, IUser } from "@/components/libs/types/type";
import UserTaskMapCard from "@/components/ui/views/home/main/tasks/UserTaskMapCard";
import { Box, Flex } from "@chakra-ui/react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
  if (!adminId) redirect("/");
  const tasks:ITask[] = await getUserTasks(params.id);
  const {id,username}:IUser = await getUser(params.id);
  
  return (
    <Flex w="100%" mt={10}
     justifyContent="center"
     alignItems="center"
     flexDir="column">
      <Box fontSize={30} fontWeight="bold">
        {`${adminId == id ? "Your" : username}'s `}
        task list
      </Box>
      <UserTaskMapCard
       tasks={tasks}
       userId={params.id}
       adminId={adminId}
       />
    </Flex>
  );
}

export default page;
