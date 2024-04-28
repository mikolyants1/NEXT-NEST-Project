import { Box } from "@chakra-ui/react"

interface IProps {
    title:string
}
function CommentTilteCard({title}:IProps):JSX.Element {
  return (
    <Box w="100%" mt={3}
     textAlign="center"
     fontSize={30} mb={3}>
       Comments for {`"${title}"`}
    </Box>
  )
}

export default CommentTilteCard