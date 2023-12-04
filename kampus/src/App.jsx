// App.js
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import AddTask from './Components/ToDoList/AddTask';
import ToDoList from './Components/ToDoList/ToDoList';
import ProfilePage from './Pages/ProfilePage';
import DashboardPage from './Pages/DashboardPage';
import ContactsPage from './Pages/ContactsPage';
import TaskDetails from './Components/ToDoList/TaskDetails';
import EditTask from './Components/ToDoList/EditTask';
import NotePad from './Components/Notepad';
import ChatPage from './Components/Chat/ChatPage';
import Home from './Components/Chat/Home';
import socketIO from "socket.io-client"

const socket = socketIO.connect("http://localhost:5005")



function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Todolist/AddTask" element={<AddTask />} /> {/* TEMPORARIO */}
        <Route path="/Todolist" element={<ToDoList />} /> {/* TEMPORARIO */}
        <Route path="/dashboard" element={<DashboardPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/contacts" element={<ContactsPage/>}/>
        <Route path="/Todolist/:_id" element={<TaskDetails />} /> {/* TEMPORARIO */}
        <Route path="/Todolist/:_id/edit" element={<EditTask />} /> {/* TEMPORARIO */}
        <Route path="/notepad" element={<NotePad/>}/>

        <Route path="/chat" element={<Home socket={socket}/>}></Route> 
        <Route path="/chat/:id" element={<ChatPage socket={socket}/>}></Route>{/* TEMPORARIO */}


      </Routes>
    </div>
  );
}

export default App;
