import { getTask } from "@/api/query/task/getTask"
import { ITask } from "@/libs/types/type";

interface IProps {
  id:string
}

async function CommentTilteCard({id}:IProps):Promise<JSX.Element> {
  const task:ITask = await getTask(id);
  return (
    <div className="w-[100%] mt-3 text-center text-3xl mb-3">
       Comments for {`"${task.title}"`}
    </div>
  )
}

export default CommentTilteCard