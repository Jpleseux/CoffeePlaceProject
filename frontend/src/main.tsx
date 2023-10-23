import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
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
// @ts-ignore
import IndividualProductPage from './pages/productsPage/individualProductPage.tsx'
import AllProductsPage from './pages/productsPage/AllProductsPage.tsx'
import EspecifyProductCategory from './pages/productsPage/especifyProducyCategory.tsx'
import EditForm from './pages/productsPage/EditForm.tsx'
import AllSallerPage from './pages/userPages/AllSallerPage.tsx'
import IndexChat from './pages/chatPages/IndexChat.tsx'
import IndexNotification from './pages/notificationPages/IndexNotification.tsx'
import UserChats from './pages/chatPages/UserChats.tsx'
import ComplaintPage from './pages/userPages/complaintPage.tsx'
import ChangePassword from './pages/userPages/ChangePassword.tsx'
import BuyPremiumAcount from './pages/userPages/BuyPremiumAcount.tsx'
function ProtectedRouteAdmin(Component:any) {
  return function WithProtection(props:any) {
    const gatewayContext = React.useContext(GatewayContext);

    useEffect(() => {
      async function checkAuthentication() {
        const userResponse = Cookies.get("userData");
        if(!userResponse) {
           window.location.href = '/home'; 
        }
        else{
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
        // @ts-ignore
        if (response.done === false|| !response) {
            window.location.href = '/'; 
        }
        }
      }

      checkAuthentication();
    }, []); 
    return <Component {...props} />;
  };
}
function ProtectedRouteBuyer(Component:any) {
  return function WithProtection(props:any) {
    const gatewayContext = React.useContext(GatewayContext);
 
    useEffect(() => {
      async function checkAuthentication() {
        const userResponse = Cookies.get("userData");
        if(!userResponse){
          window.location.href = '/home'; 
        }
        else{
                  // @ts-ignore
        const ResponseJson = JSON.parse(userResponse);
        const indentification = ResponseJson.typeUser
        // @ts-ignore
        if(!indentification.isSalesman ===true || !indentification.isSalesman===true){
          window.location.href = '/home'; 
        }
        const response = await CookieFactory.verifyToken(
          Cookies.get("jwttoken"),
          gatewayContext
        );
        // @ts-ignore
        if (response.done === false || !response) {
            window.location.href = '/'; 
        }
        }
 
      }

      checkAuthentication();
    }, []); 
    return <Component {...props} />;
  };
}
function ProtectedLoggedBuyer(Component:any) {
  return function WithProtection(props:any) {
    const gatewayContext = React.useContext(GatewayContext);
 
    useEffect(() => {
      async function checkAuthentication() {
        const userResponse = Cookies.get("userData");
        if(!userResponse){
          window.location.href = '/home'; 
        }
        else{
                  // @ts-ignore
        const ResponseJson = JSON.parse(userResponse);
        const indentification = ResponseJson.typeUser
        // @ts-ignore
        if(!indentification){
          window.location.href = '/home'; 
        }
        const response = await CookieFactory.verifyToken(
          Cookies.get("jwttoken"),
          gatewayContext
        );
        // @ts-ignore
        if (response.done === false || !response) {
            window.location.href = '/'; 
        }
        }
 
      }

      checkAuthentication();
    }, []); 
    return <Component {...props} />;
  };
}
const ProtectedRoutes = {Category: ProtectedRouteAdmin(Category), ProductForm: ProtectedRouteBuyer(ProductForm), IndividualProductPage:ProtectedLoggedBuyer(IndividualProductPage), EditForm: ProtectedRouteBuyer(EditForm), notificationArea:ProtectedLoggedBuyer(IndexNotification), chatsUser:ProtectedLoggedBuyer(UserChats),  complaintPage:ProtectedLoggedBuyer(ComplaintPage), BuyPremiumAcount:ProtectedLoggedBuyer(BuyPremiumAcount)}

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
        element:<ProtectedRoutes.ProductForm/>
      },
      {
        path:"/product/:id",
        element:<ProtectedRoutes.IndividualProductPage/>
      },
      {
        path:"/product/all",
        element:<AllProductsPage/>
      },
      {
        path:"/product/especify/:id",
        element:<EspecifyProductCategory/>
      },
      {
        path:"/product/edit/:id",
        element:<ProtectedRoutes.EditForm/>
      },
      {
        path:"/user/all",
        element:<AllSallerPage/>
      },
      {
        path:"/chat/:id",
        element:<IndexChat/>
      },
      {
        path:"/notifications/:id",
        element:<ProtectedRoutes.notificationArea/>
      },
      {
        path:"/chats/:id",
        element:<ProtectedRoutes.chatsUser/>
      },
      {
        path:"/complaint/:emailId",
        element:<ProtectedRoutes.complaintPage/>
      },
      {
        path:"/change/password/:email",
        element:<ChangePassword/>
      },
      {
        path:"/buy/account/:email",
        element:<ProtectedRoutes.BuyPremiumAcount/>
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
