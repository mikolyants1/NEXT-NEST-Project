'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface IProps {
  children:JSX.Element
}

const query:QueryClient = new QueryClient({
    defaultOptions:{
      queries:{
        refetchOnWindowFocus:false
      }
    }
})

function QueryLayout({children}:IProps):JSX.Element {
  return (
    <QueryClientProvider client={query}>
      {children}
    </QueryClientProvider>
  )
}

export default QueryLayout