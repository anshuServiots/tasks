import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AppRouter } from './helper/appRouter'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={AppRouter}/>
  </StrictMode>,
)
