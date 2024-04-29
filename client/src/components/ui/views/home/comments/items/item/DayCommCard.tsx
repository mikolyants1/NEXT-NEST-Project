
import { getDayOfComment } from '@/components/model/functions/find/getDayOfComm';
import { Box } from '@chakra-ui/react';

interface IProps {
  time:string
}

function DayCommCard({time}:IProps):JSX.Element {
 const date:string = getDayOfComment(time);
  return (
    <Box w='100%'
     textAlign="center"
     fontSize={18}>
      {date}
    </Box>
  )
}

export default DayCommCard