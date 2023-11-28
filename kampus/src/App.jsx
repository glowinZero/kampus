import './App.css'
import {Routes, Route} from "react-router-dom"
import LandingPage from './Pages/LandingPage'
import LoginPage from './Pages/LoginPage'
import ProfilePage from './Pages/ProfilePage';
import DashboardPage from './Pages/DashboardPage';
import ContactsPage from './Pages/ContactsPage';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/dashboard" element={<DashboardPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/contacts" element={<ContactsPage/>}/>
      </Routes>
    </div>
  )
}

export default App
