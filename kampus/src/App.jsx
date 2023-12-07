// App.js
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import DashboardPage from "./Pages/DashboardPage";
import VirtualTour from "./Pages/VirtualTour";
import WebPage from "./Pages/WebPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<WebPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/virtualtour" element={<VirtualTour />} />
      </Routes>
    </div>
  );
}

export default App;
