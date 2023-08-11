import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.tsx'
import SignUp from './pages/SignUp.tsx'
import Home from './pages/Home.tsx'
import { GatewayProvider } from './gateway/gatewayContext'
import { GatewayContext } from './gateway/gatewayContext'; 
import CookieFactory from './utils/CookieFactory.tsx'
import {useEffect} from "react"
import Cookies from 'js-cookie'
import NotFound from './components/404/NotFound.tsx'

function ProtectedRouteAdmin(Component:any) {
  return function WithProtection(props:any) {
    const gatewayContext = React.useContext(GatewayContext);

    useEffect(() => {
      async function checkAuthentication() {
        
        Cookies.get("jwttoken")
 
      }

      checkAuthentication();
    }, []); 
    return <Component {...props} />;
  };
}
const ProtectedRoutes = {Home: ProtectedRouteAdmin(Home)}

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children:[
      {
        path: "/home",
        element: <Home/>
      },
      {
        path: "/",
        element: <Login />
      },
      {
        path:"/signup",
        element:<SignUp/>
      },
      {
        path:"*",
        element:<NotFound/>
      }
    ]
  }
]) 

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GatewayProvider >
      <RouterProvider router={router} />
    </GatewayProvider>
  </React.StrictMode>,
)
