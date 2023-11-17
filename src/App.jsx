import {
  Route,
  Outlet,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate
} from 'react-router-dom'

import { RouteNames } from './components/constants'
import AppLayout from './layout/AppLayout'
import Clients from './pages/Clients'

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
      <Route
        index
        element={<Navigate to={RouteNames.Clients} replace={true} />}
      />
      <Route path={RouteNames.Clients} element={<Clients />} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
