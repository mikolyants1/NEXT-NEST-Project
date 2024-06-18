import { getDayOfComment } from '@/model/functions/find/getDayOfComm';

interface IProps {
  time:number
}

function DayCommCard({time}:IProps):JSX.Element {
 const date:string = getDayOfComment(time);
  return (
    <div className="w-[100%] text-center text-xl">
      {date}
    </div>
  )
}

export default DayCommCard