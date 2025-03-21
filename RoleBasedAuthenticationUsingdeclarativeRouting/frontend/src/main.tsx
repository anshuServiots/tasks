import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppRouter } from './route.tsx'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={AppRouter }/>
  </StrictMode>,
)
