import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
<<<<<<< HEAD
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.tsx'
import SignUp from './pages/SignUp.tsx'
import Home from './pages/Home.tsx'
import { GatewayProvider } from './gateway/gatewayContext'
import { GatewayContext } from './gateway/gatewayContext'; 
import CookieFactory from './utils/CookieFactory.tsx'
import {useEffect} from "react"
import Cookies from 'js-cookie'

function ProtectedRoute(Component:any) {
  return function WithProtection(props:any) {
    const gatewayContext = React.useContext(GatewayContext);

    useEffect(() => {
      async function checkAuthentication() {
        const response = await CookieFactory.verifyToken(
          Cookies.get("jwttoken"),
          gatewayContext
        );
 
        if (response.done === false) {
          setTimeout(() => {
            window.location.href = '/'; 
          }, 5000);
        }
      }

      checkAuthentication();
    }, []); 
    return <Component {...props} />;
  };
}
const ProtectedRoutes = {Home: ProtectedRoute(Home)}

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children:[
      {
        path: "/home",
        element: <ProtectedRoutes.Home/>
      },
      {
        path: "/",
        element: <Login />
      },
      {
        path:"/signup",
        element:<SignUp/>
      }
    ]
  }
]) 

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GatewayProvider >
      <RouterProvider router={router} />
    </GatewayProvider>
=======

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
>>>>>>> origin/main
  </React.StrictMode>,
)
