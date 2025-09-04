'use client'

import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30000 },
    mutations: {},
  },
})

export const ReactQueryClientProvider = ({
  children,
}: {
  children: ReactNode
}) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
