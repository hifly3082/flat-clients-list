import {
  Route,
  Outlet,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate
} from 'react-router-dom'

import AppLayout from './layout/AppLayout'
import ClientsPage from './pages/ClientsPage'

import './App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/*'
      element={
        <AppLayout>
          <Outlet />
        </AppLayout>
      }>
      <Route index element={<Navigate to='clients' replace={true} />} />
      <Route path='clients' element={<ClientsPage />} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
