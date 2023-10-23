import { Outlet } from 'react-router'
import NavBar from './components/navbar/NavBar'
import './App.css'
import Footer from './components/footer/footer'

function App() {
  
  return (
    <div>
        <div>
          <NavBar/>
          <Outlet/>
          <Footer/>
        </div>
      
    </div>
  )

}

export default App
