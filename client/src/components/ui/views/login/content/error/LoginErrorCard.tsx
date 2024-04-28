import { Box } from '@chakra-ui/react';
import {memo} from 'react';

interface IProps {
  error:string
}
function LoginErrorCard({error}:IProps):JSX.Element {
  return (
        <Box>
          {error&&(
            <Box color='red'
             mt={5} textAlign='center'>
               {error}
            </Box>
            )}
        </Box>
  )
}

export default memo(LoginErrorCard)