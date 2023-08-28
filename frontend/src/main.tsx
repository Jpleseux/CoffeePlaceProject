import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, json, RouterProvider } from 'react-router-dom'
import Login from './pages/userPages/Login.tsx'
import SignUp from './pages/userPages/SignUp.tsx'
import Home from './pages/userPages/Home.tsx'
import { GatewayProvider } from './gateway/gatewayContext'
import { GatewayContext } from './gateway/gatewayContext'; 
import Category from './pages/categoriesPages/Category.tsx'
import CookieFactory from './utils/CookieFactory.tsx'
import {useEffect} from "react"
import Cookies from 'js-cookie'
import NotFound from './components/404/NotFound.tsx'
import IndividualSallerPage from './pages/sallersPage/IndividualSallerPage.tsx'
import ProductForm from './pages/productsPage/ProductForm.tsx'

function ProtectedRouteAdmin(Component:any) {
  return function WithProtection(props:any) {
    const gatewayContext = React.useContext(GatewayContext);

    useEffect(() => {
      async function checkAuthentication() {
        const userResponse = Cookies.get("userData");
        if(!userResponse) window.location.href = '/home'; 

        // @ts-ignore
        const ResponseJson = JSON.parse(userResponse);
        const indentification = ResponseJson.typeUser
        // @ts-ignore
        if(!indentification.isAdmin ===true){
          window.location.href = '/home'; 
        }
        const response = await CookieFactory.verifyToken(
          Cookies.get("jwttoken"),
          gatewayContext
        );
 
        if (response.done === false|| !response) {
            window.location.href = '/'; 
        }
 
      }

      checkAuthentication();
    }, []); 
    return <Component {...props} />;
  };
}
const ProtectedRoutes = {Category: ProtectedRouteAdmin(Category)}

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
        path:"/category/create",
        element:<ProtectedRoutes.Category/>
      },
      {
        path:"saller/individual/:name",
        element:<IndividualSallerPage/>
      },
      {
        path:"/product/create",
        element:<ProductForm/>
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
