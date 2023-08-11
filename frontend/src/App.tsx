import { Outlet } from 'react-router'
import NavBar from './components/navbar/NavBar'
import './App.css'
import Footer from './components/footer/footer'
function App() {

  return (
    <div>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
  )

}

export default App
