import { Box } from '@chakra-ui/react'

interface IProps {
  length:number
}

function InviteCount({length}:IProps):JSX.Element {
 const size:string = length ?
  length >= 10 ? "23px" : "20px" : "20px";

  const count = `${length > 10 ? "10+" : length}`;
  
  return (
    <Box fontSize={14}
     borderRadius="50%" h={size}
     bg={length ? "red" : "black"}
     color="white" textAlign="center"
     w={size}
     pt={length >= 10 ? 0.5 : 0}>
      {count}
   </Box>
  )
}

export default InviteCount