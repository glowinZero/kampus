import './App.css'
import {Routes, Route} from "react-router-dom"
import LandingPage from './Pages/LandingPage'
import LoginPage from './Pages/LoginPage'
import NavBar from './Components/NavBar';

function App() {

  return (
    <div>
    <NavBar/>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </div>
  )
}

export default App
