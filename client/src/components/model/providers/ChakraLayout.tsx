'use client'

import React, {type ReactNode } from 'react'
import {ChakraProvider, theme} from '@chakra-ui/react';

interface IProps {
  children:ReactNode
}

function ChakraLayout({children}:IProps):JSX.Element {
  return (
    <ChakraProvider theme={theme}>
        {children}
    </ChakraProvider>
  )
}

export default ChakraLayout