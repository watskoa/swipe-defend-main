import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AuthProvider from './Provider/AuthProvider/AuthProvider';

import {
  RouterProvider,
} from "react-router-dom";

// tanstack query
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { router } from './Routes/Routes';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode >,
)
