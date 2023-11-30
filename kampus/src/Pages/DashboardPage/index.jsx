import { AuthContext } from '../../Context/auth.context';
import NavBar from '../../Components/Navbar/NavBar';
import Pommodoro from '../../Components/Pommodoro';
import { useEffect, useContext, useState } from "react";
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:5005";

function DashboardPage(){
    const {isLoggedIn, user, logOut } = useContext(AuthContext);
    const [loggedUser, setLoggedUser] = useState()
    const [isStudent, setIsStudent] = useState(true)
    const [users, setUsers] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        console.log("user", user, isLoggedIn);
      
        const fetchData = async () => {
          const getToken = localStorage.getItem("authToken");
      
          if (getToken && user) {
            try {
              const idUser = user._id;
      
              const responseUser = await axios.get(`${API_URL}/auth/users/${idUser}`);
              console.log(responseUser.data.isStudent);
              setIsStudent(responseUser.data.isStudent);
              setLoggedUser(responseUser.data);
      
              const responseUsers = await axios.get(`${API_URL}/auth/users/`);
              console.log("users", responseUsers.data);
              setUsers(responseUsers.data);
            } catch (error) {
              console.error("Error fetching user details:", error);
            }
          }
        };
      
        fetchData();
      }, [user, isLoggedIn]);
      

    const logout = () =>{
        logOut();
        setLoggedUser("")
        setUsers([])
        navigate("/")
    }

    return (
        <div>
            {isStudent === true ? (
                <div>
                    <NavBar />
                    {loggedUser && <h1>Hi {loggedUser.firstName}</h1>}
                    <p>To put Todo List component</p>
                    <p>To put Todo NotePad component</p>
                    <p>To put Todo Pomodoro component</p>
                    <Pommodoro />
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <div>
                    <NavBar />
                    <h1>Students</h1>
                    {users.map((user) => (
                        <div key={user._id}>
                            {user.firstName}
                            {user.lastName}
                            {user.cohort}
                            {user.campus}
                            <button onClick={logout}>Logout</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DashboardPage 