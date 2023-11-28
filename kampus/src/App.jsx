import './App.css'
import {Routes, Route} from "react-router-dom"
import LandingPage from './Pages/LandingPage'
import LoginPage from './Pages/LoginPage'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </div>
  )
}

export default App
