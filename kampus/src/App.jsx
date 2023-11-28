// App.js
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import NavBar from './Components/NavBar';
import AddTask from './Components/ToDoList/AddTask';
import ToDoList from './Components/ToDoList/ToDoList';
function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Todolist/AddTask" element={<AddTask />} /> {/* TEMPORARIO */}
        <Route path="/Todolist" element={<ToDoList />} /> {/* TEMPORARIO */}

      </Routes>
    </div>
  );
}

export default App;
