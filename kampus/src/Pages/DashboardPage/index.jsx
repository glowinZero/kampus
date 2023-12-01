import { AuthContext } from '../../Context/auth.context';
import NavBar from '../../Components/Navbar/NavBar';
import Pommodoro from '../../Components/Pommodoro';
import { useEffect, useContext, useState } from "react";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import ToDoList from '../../Components/ToDoList/ToDoList';
import NotePad from '../../Components/Notepad';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";


const API_URL = "http://localhost:5005";

function DashboardPage(){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {isLoggedIn, user, logOut } = useContext(AuthContext);
    const [loggedUser, setLoggedUser] = useState()
    const [isStudents, setIsStudents] = useState(true)
    const [users, setUsers] = useState([])
    const [email, setEmail] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [cohort, setCohort] = useState();
    const [campus, setCampus] = useState();
    const [manager, setManager] = useState();
    const [teacher, setTeacher] = useState();
    const [type, setType] = useState(true);
    const [password, setPassword] = useState();
    const [userDelete, setUserDelete] = useState();
    const [editingUser, setEditingUser] = useState(null);
    const [userEdit, setUserEdit] = useState();

    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("authToken")

      if(!token){
          onOpen()
          
          setTimeout(() => {
            navigate("/")
          }, 3000);    
        }

        const fetchData = async () => {
          const getToken = localStorage.getItem("authToken");
      
          if (getToken && user) {
            try {
              const idUser = user._id;
      
              const responseUser = await axios.get(`${API_URL}/auth/users/${idUser}`);
              console.log(responseUser.data.isStudent);
              setIsStudents(responseUser.data.isStudent);
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

    const addStudent = () =>{
        setType(true)
        const isStudent = type;
        const request = { email, password, firstName, lastName, cohort, campus, manager, teacher, isStudent};
        
        if(email === '' || password === '' || firstName === '' || lastName === '' || cohort === '' || campus === '' || manager === '' || teacher === '' || isStudent === ''){
            alert("Provide all fields in order to create a new Student")
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
        if(!emailRegex.test(email)){
            alert("Provide a valid email")
            return; 
        }
    
        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if(!passwordRegex.test(password)){
            alert("Password must have at least 6 characters and contain 1 lowercase letter, 1 uppercase letter, 1 number"); 
            return; 
        }
        
        axios.post(`${API_URL}/auth/signup`, request).then(() => {
            navigate(`/dashboard`);
        }).catch(() => {
        alert('Failed to create a Student. Please try again.');
        });

        const fetchData = async () => {
        const getToken = localStorage.getItem("authToken");
    
        if (getToken && user) {
          try {
            const idUser = user._id;
    
            const responseUser = await axios.get(`${API_URL}/auth/users/${idUser}`);
            console.log(responseUser.data.isStudents);
            setIsStudents(responseUser.data.isStudents);
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
    }

    const resetInputs = () =>{
        setEmail("")
        setCampus("")
        setCohort("")
        setFirstName("")
        setLastName("")
        setManager("")
        setTeacher("")
        setPassword("")
    }

    const deleteStudent = (elem) =>{

        axios.delete(`${API_URL}/auth/users/${elem._id}`)
        .then(() => {
            console.log(userDelete)
      })
      .catch((error) => {
        console.error('Error deleting Student:', error);
        alert('Failed to delete Student. Please try again.');
      });

      const fetchData = async () => {
        const getToken = localStorage.getItem("authToken");
    
        if (getToken && user) {
          try {
            const idUser = user._id;
    
            const responseUser = await axios.get(`${API_URL}/auth/users/${idUser}`);
            console.log(responseUser.data.isStudents);
            setIsStudents(responseUser.data.isStudents);
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
    }

    const editStudent = (userEdit) =>{
        console.log("edituser", userEdit)
        setType(true)
        const isStudent = editingUser ? editingUser.isStudent : type;
        const updatedFields = {
            ...(email !== undefined && { email: email !== '' ? email : editingUser.email }),
            ...(password !== undefined && { password: password !== '' ? password : editingUser.password }),
            ...(firstName !== undefined && { firstName: firstName !== '' ? firstName : editingUser.firstName }),
            ...(lastName !== undefined && { lastName: lastName !== '' ? lastName : editingUser.lastName }),
            ...(cohort !== undefined && { cohort: cohort !== '' ? cohort : editingUser.cohort }),
            ...(campus !== undefined && { campus: campus !== '' ? campus : editingUser.campus }),
            ...(manager !== undefined && { manager: manager !== '' ? manager : editingUser.manager }),
            ...(teacher !== undefined && { teacher: teacher !== '' ? teacher : editingUser.teacher }),
            isStudent,
        };

        if (Object.keys(updatedFields).length === 0) {
            alert("No fields to update");
            return;
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
        if (!emailRegex.test(updatedFields.email)) {
            alert("Provide a valid email");
            return;
        }
    
        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (!passwordRegex.test(updatedFields.password)) {
            alert("Password must have at least 6 characters and contain 1 lowercase letter, 1 uppercase letter, 1 number"); 
            return; 
        }
        
        axios.put(`${API_URL}/auth/users/${userEdit._id}`, updatedFields)
        .then(() => {
        navigate(`/dashboard`);
      })
      .catch((error) => {
        console.error('Error creating task:', error);
        alert('Failed to create task. Please try again.');
      });

      const fetchData = async () => {
        const getToken = localStorage.getItem("authToken");
    
        if (getToken && user) {
          try {
            const idUser = user._id;
            const responseUser = await axios.get(`${API_URL}/auth/users/${idUser}`);
            console.log(responseUser.data.isStudent);
            setIsStudents(responseUser.data.isStudent);
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
    }

    const openEditModal = (user) => {
        setEditingUser(user);
        onOpen();
    };

    const closeModal = (onClose) => {
        setEditingUser();
        resetInputs();
        onClose();
    };

    return (
        <div>
        {!loggedUser ? (
        <Modal
          classNames={{
            size: "4xl",
            body: "py-6",
            backdrop: "bg-[#292f46]/50 backdrop-opacity-40 blur",
            base: "border-[#292f46] bg-white text-[#71717a]",
            header: "border-b-[1px] border-[#292f46]",
            footer: "border-t-[1px] border-[#292f46]",
            closeButton: "active:bg-white/10",
          }}
          size="2xl"
          backdrop="blur"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
        >
          <ModalContent>
            {(onClose) => (
              <div>
                <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                <ModalBody>
                  <p>User not Logged in</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={() => onClose()}>
                    Close
                  </Button>
                </ModalFooter>
              </div>
            )}
          </ModalContent>
        </Modal>
      ) : ( <div>
            {isStudents === true ? (
                <div>
                    <NavBar />
                    {loggedUser && <h1>Hi {loggedUser.firstName}</h1>}
                    <NotePad/>
                    <ToDoList/>
                    <Pommodoro />
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <div>
          <NavBar />
          <h1>Students</h1>
          {users.map((elem) => (
            <div key={elem._id}>
            {elem.firstName}
            {elem.lastName}
            {elem.cohort}
            {elem.campus}
            <Button onPress={()=>{deleteStudent(elem); setUserDelete(elem)}} size="lg" className="bg-[#D3D3D3] text-[#00072D] w-64 h-12 font-semibold shadow-lg">
                delete
            </Button>
            <Button onPress={() => {resetInputs();openEditModal(elem); setUserEdit(elem) }} size="lg" className="bg-[#D3D3D3] text-[#00072D] w-64 h-12 font-semibold shadow-lg">
                edit student 
            </Button>
            </div>
          ))}
          <Modal
            classNames={{
              size: "4xl",
              body: "py-6",
              backdrop: "bg-[#292f46]/50 backdrop-opacity-40 blur",
              base: "border-[#292f46] bg-white text-[#71717a]",
              header: "border-b-[1px] border-[#292f46]",
              footer: "border-t-[1px] border-[#292f46]",
              closeButton: "active:bg-white/10",
            }}
            size="2xl"
            backdrop="blur"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center">
            <ModalContent>
              {(onClose) => (
                <div >
                  <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                  <ModalBody className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <Input
                        autoFocus
                        label="First Name"
                        variant="flat"
                        value={editingUser ? editingUser.firstName : firstName}
                        onChange={(e) =>editingUser ? setEditingUser({ ...editingUser, firstName: e.target.value }) : setFirstName(e.target.value)}
                    />
                    <Input
                        label="Last Name"
                        variant="flat"
                        value={editingUser ? editingUser.lastName : lastName}
                        onChange={(e) =>editingUser ? setEditingUser({ ...editingUser, lastName: e.target.value }) : setLastName(e.target.value)}
                    />
                    <Input
                        label="Email"
                        variant="flat"
                        value={editingUser ? editingUser.email : email}
                        onChange={(e) =>editingUser ? setEditingUser({ ...editingUser, email: e.target.value }) : setEmail(e.target.value)}
                    />
                    <Input
                        label="Password"
                        variant="flat"
                        value={editingUser ? editingUser.password : password}
                        onChange={(e) =>editingUser ? setEditingUser({ ...editingUser, password: e.target.value }) : setPassword(e.target.value)}
                    />
                    <Input
                        label="Cohort"
                        variant="flat"
                        value={editingUser ? editingUser.cohort : cohort}
                        onChange={(e) =>editingUser ? setEditingUser({ ...editingUser, cohort: e.target.value }) : setCohort(e.target.value)}
                    />
                    <Input
                        label="Campus"
                        variant="flat"
                        value={editingUser ? editingUser.campus : campus}
                        onChange={(e) =>editingUser ? setEditingUser({ ...editingUser, campus: e.target.value }) : setCampus(e.target.value)}
                    />
                    <Input
                        label="Teacher"
                        variant="flat"
                        value={editingUser ? editingUser.teacher : teacher}
                        onChange={(e) =>editingUser ? setEditingUser({ ...editingUser, teacher: e.target.value }) : setTeacher(e.target.value)}
                    />
                    <Input
                        label="Manager"
                        variant="flat"
                        value={editingUser ? editingUser.manager : manager}
                        onChange={(e) =>editingUser ? setEditingUser({ ...editingUser, manager: e.target.value }) : setManager(e.target.value)}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={() => closeModal(onClose)}>
                      Close
                    </Button>
                    <Button color="primary" onClick={() => {if (editingUser) {editStudent(userEdit);} else {addStudent();}onClose();}}>
                      Submit
                    </Button>
                  </ModalFooter>
                </div>
              )}
            </ModalContent>
          </Modal>
            <Button onPress={onOpen} size="lg" className="bg-[#D3D3D3] text-[#00072D] w-64 h-12 font-semibold shadow-lg">
                add student
            </Button>
        </div>
      )}
      <button onClick={logout}>Logout</button>
    </div>
    )}
    </div>
    );
}

export default DashboardPage 