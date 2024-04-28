import { Box } from '@chakra-ui/react'
import React from 'react'

function EmptyNotCard():JSX.Element {
  return (
    <Box fontSize={24}
     textAlign="center">
      You have no notifications here
    </Box>
  )
}

export default EmptyNotCard