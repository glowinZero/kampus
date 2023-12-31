import { AuthContext } from "../../Context/auth.context";
import NavBar from "../../Components/Navbar/NavBar";
import Pommodoro from "../../Components/Pommodoro";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import addIcon from "../../assets/images/add.png";
import removeIcon from "../../assets/images/remove.png";
import editIcon from "../../assets/images/pencil.png";
import { useNavigate } from "react-router-dom";
import Tasks from "../../Components/ToDoList";
import NotePad from "../../Components/Notepad";
import {
  Spacer,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Card,
  CardBody,
} from "@nextui-org/react";

const API_URL = "https://kampus.adaptable.app";

function DashboardPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isLoggedIn, user } = useContext(AuthContext);
  const [loggedUser, setLoggedUser] = useState();
  const [isStudents, setIsStudents] = useState(true);
  const [users, setUsers] = useState([]);
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
    const token = localStorage.getItem("authToken");

    if (!token) {
      onOpen();

      setTimeout(() => {
        navigate("/landing");
      }, 3000);
    }

    const fetchData = async () => {
      const getToken = localStorage.getItem("authToken");

      if (getToken && user) {
        try {
          const idUser = user._id;

          const responseUser = await axios.get(
            `${API_URL}/auth/users/${idUser}`
          );
          setIsStudents(responseUser.data.isStudent);
          setLoggedUser(responseUser.data);

          const responseUsers = await axios.get(`${API_URL}/auth/users/`);
          setUsers(responseUsers.data);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchData();
  }, [user, isLoggedIn]);

  const addStudent = async () => {
    setType(true);
    const isStudent = type;
    const request = {
      email,
      password,
      firstName,
      lastName,
      cohort,
      campus,
      manager,
      teacher,
      isStudent,
    };
  
    if (
      email === "" ||
      password === "" ||
      firstName === "" ||
      lastName === "" ||
      cohort === "" ||
      campus === "" ||
      manager === "" ||
      teacher === "" ||
      isStudent === ""
    ) {
      alert("Provide all fields in order to create a new Student");
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("Provide a valid email");
      return;
    }
  
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must have at least 6 characters and contain 1 lowercase letter, 1 uppercase letter, 1 number"
      );
      return;
    }
  
    try {
      await axios.post(`${API_URL}/auth/signup`, request);
      alert("Student created successfully");
  
      const idUser = user._id;
      const responseUser = await axios.get(`${API_URL}/auth/users/${idUser}`);
      setIsStudents(responseUser.data.isStudents);
      setLoggedUser(responseUser.data);
  
      const responseUsers = await axios.get(`${API_URL}/auth/users/`);
      setUsers(responseUsers.data);
  
      navigate(`/dashboard`);
    } catch (error) {
      console.error("Error creating student:", error);
      alert("Failed to create a student. Please try again.");
    }
  };
  

  const resetInputs = () => {
    setEmail("");
    setCampus("");
    setCohort("");
    setFirstName("");
    setLastName("");
    setManager("");
    setTeacher("");
    setPassword("");
  };

  const deleteStudent = (elem) => {
    axios
      .delete(`${API_URL}/auth/users/${elem._id}`)
      .then(() => {
        console.log(userDelete);
      })
      .catch((error) => {
        console.error("Error deleting Student:", error);
        alert("Failed to delete Student. Please try again.");
      });

    const fetchData = async () => {
      const getToken = localStorage.getItem("authToken");

      if (getToken && user) {
        try {
          const idUser = user._id;

          const responseUser = await axios.get(
            `${API_URL}/auth/users/${idUser}`
          );
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
  };

  const editStudent = (userEdit) => {
    setType(true);
    const isStudent = editingUser ? editingUser.isStudent : type;

    const updatedFields = {
      ...(email !== undefined && {
        email: email !== "" ? email : editingUser.email,
      }),
      ...(password !== undefined && {
        password: password !== "" ? password : editingUser.password,
      }),
      ...(firstName !== undefined && {
        firstName: firstName !== "" ? firstName : editingUser.firstName,
      }),
      ...(lastName !== undefined && {
        lastName: lastName !== "" ? lastName : editingUser.lastName,
      }),
      ...(cohort !== undefined && {
        cohort: cohort !== "" ? cohort : editingUser.cohort,
      }),
      ...(campus !== undefined && {
        campus: campus !== "" ? campus : editingUser.campus,
      }),
      ...(manager !== undefined && {
        manager: manager !== "" ? manager : editingUser.manager,
      }),
      ...(teacher !== undefined && {
        teacher: teacher !== "" ? teacher : editingUser.teacher,
      }),
      isStudent,
    };

    if (Object.keys(updatedFields).length === 0) {
      alert("No fields to update");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(updatedFields.email)) {
      alert("Provide a valid email");
      return;
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(updatedFields.password)) {
      alert(
        "Password must have at least 6 characters and contain 1 lowercase letter, 1 uppercase letter, 1 number"
      );
      return;
    }

    axios
      .put(`${API_URL}/auth/users/${userEdit._id}`, updatedFields)
      .then(() => {
        setEditingUser({ ...editingUser, ...updatedFields });
        navigate(`/dashboard`);
      })
      .catch((error) => {
        console.error("Error creating task:", error);
        alert("Failed to create task. Please try again.");
      });

    const fetchData = async () => {
      const getToken = localStorage.getItem("authToken");

      if (getToken && user) {
        try {
          const idUser = user._id;
          const responseUser = await axios.get(
            `${API_URL}/auth/users/${idUser}`
          );
          setIsStudents(responseUser.data.isStudent);
          setLoggedUser(responseUser.data);

          const responseUsers = await axios.get(`${API_URL}/auth/users/`);
          setUsers(responseUsers.data);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchData();
  };

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
    <div className="h-[100vh] w-[100vw]">
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
                <ModalHeader className="flex flex-col gap-1 text-center">
                  ERROR
                </ModalHeader>
                <ModalBody>
                  <p>User not Logged in</p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="flat"
                    onPress={() => onClose()}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </div>
            )}
          </ModalContent>
        </Modal>
      ) : (
        <div>
          {isStudents === true ? (
            <div id="dashboard-staff" className="w-screen">
              <NavBar />
              <div className="  w-[91.5vw] h-[95vh] bg-gray-50 m-5 p-5 rounded-3xl overflow-auto scrollbar-hide overscroll-none scroll-smooth">
                {loggedUser && (
                  <h1 className="font-bold text-Color2">
                    Hi {loggedUser.firstName}!
                  </h1>
                )}
                <div className=" w-[100%] h-[30vh] bg-Color3/40 shadow-lg shadow-Color3/40 mt-5 mb-5 pt-5 pb-5 rounded-3xl overflow-auto scrollbar-hide overscroll-none scroll-smooth relative">
                  <Tasks />
                </div>
                <div className="flex  auto row place-content-between w-[100%] h-[50vh] bg-gray-50  rounded-3xl">
                  <div className="flex-1 pr-5 pl-5 pt-5 pb-5 mb-5 mr-5 bg-Color3/40 shadow-lg shadow-Color3/40 rounded-3xl overflow-auto scrollbar-hide overscroll-none scroll-smooth">
                    <NotePad />
                  </div>
                  <div className="w-[24%] pr-5 pl-5 pt-5 pb-5 mb-5 bg-Color3/40 shadow-lg shadow-Color3/40 rounded-3xl">
                    <Pommodoro></Pommodoro>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div id="dashboard-staff" className="w-screen">
              <NavBar />
              <div className=" w-[91.5vw] h-[95vh] bg-gray-50 m-5 p-5 rounded-3xl overflow-auto scrollbar-hide overscroll-none scroll-smooth">
                <h1
                  id="heading-staff-dashboard"
                  className=" font-light text-Color3 p-3 text-left"
                >
                  USERS
                </h1>
                {users.map((elem) => (
                  <div key={elem._id} id="students-list">
                    <Spacer y={8} />
                    <Card className="shadow-lg shadow-Color3/40">
                      <CardBody
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingLeft: "2vw",
                          paddingRight: "2vw",
                        }}
                        className=" bg-Color3/40  "
                      >
                        <div id="students-card">
                          <p id="name">
                            {elem.firstName} {elem.lastName}
                          </p>
                          <p id="email">{elem.email}</p>
                          <Spacer x={16} />
                          <p id="students-card-p">
                            {elem.isStudent === true ? "STUDENT" : "STAFF"}
                          </p>
                          <Spacer x={8} />
                          <p id="students-card-p">{elem.cohort}</p>
                          <Spacer x={8} />
                          <p id="students-card-p">{elem.campus}</p>
                        </div>
                        <div id="buttons-students-list">
                          <Button
                            isIconOnly
                            onPress={() => {
                              resetInputs();
                              openEditModal(elem);
                              setUserEdit(elem);
                            }}
                            size="lg"
                            className=" rounded-full bg-transparent"
                          >
                            <img
                              src={editIcon}
                              className="flex-shrink-0 color w-[auto] h-6"
                            />
                          </Button>
                          <Button
                            isIconOnly
                            onPress={() => {
                              deleteStudent(elem);
                              setUserDelete(elem);
                            }}
                            size="lg"
                            className="rounded-full bg-transparent"
                          >
                            <img
                              src={removeIcon}
                              className="flex-shrink-0 w-[auto] h-6"
                            />
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                ))}
                <Modal
                  classNames={{
                    size: "4xl",
                    body: "py-6",
                    backdrop:
                      "bg-gradient-to-t from-ScaleColor1-500 to-ScaleColor1-500/10 backdrop-opacity-20",
                    base: "border-[#292f46] bg-white text-black",
                    header: "border-b-[1px] border-[#292f46] text-black",
                    footer: "border-t-[1px] border-[#292f46]",
                    closeButton: "active:bg-white/10",
                  }}
                  motionProps={{
                    variants: {
                      enter: {
                        y: 0,
                        opacity: 1,
                        transition: {
                          duration: 0.2,
                          ease: "easeOut",
                        },
                      },
                      exit: {
                        y: -20,
                        opacity: 0,
                        transition: {
                          duration: 0.2,
                          ease: "easeIn",
                        },
                      },
                    },
                  }}
                  backdrop="opaque"
                  size="2xl"
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                  placement="center"
                >
                  <ModalContent>
                    {(onClose) => (
                      <div>
                        <ModalHeader className="flex flex-col gap-1">
                          Log in
                        </ModalHeader>
                        <ModalBody className="grid grid-cols-2 gap-4">
                          <Input
                            autoFocus
                            label="First Name"
                            variant="bordered"
                            value={
                              editingUser ? editingUser.firstName : firstName
                            }
                            onChange={(e) =>
                              editingUser
                                ? setEditingUser({
                                    ...editingUser,
                                    firstName: e.target.value,
                                  })
                                : setFirstName(e.target.value)
                            }
                          />
                          <Input
                            label="Last Name"
                            variant="bordered"
                            value={
                              editingUser ? editingUser.lastName : lastName
                            }
                            onChange={(e) =>
                              editingUser
                                ? setEditingUser({
                                    ...editingUser,
                                    lastName: e.target.value,
                                  })
                                : setLastName(e.target.value)
                            }
                          />
                          <Input
                            label="Email"
                            variant="bordered"
                            value={editingUser ? editingUser.email : email}
                            onChange={(e) =>
                              editingUser
                                ? setEditingUser({
                                    ...editingUser,
                                    email: e.target.value,
                                  })
                                : setEmail(e.target.value)
                            }
                          />
                          <Input
                            label="Password"
                            type="password"
                            disabled={editingUser ? true : false}
                            variant="bordered"
                            value={
                              editingUser ? editingUser.password : password
                            }
                            onChange={(e) =>
                              editingUser
                                ? setEditingUser({
                                    ...editingUser,
                                    password: e.target.value,
                                  })
                                : setPassword(e.target.value)
                            }
                            style={{ opacity: 0.5 }}
                          />
                          <Input
                            label="Cohort"
                            variant="bordered"
                            value={editingUser ? editingUser.cohort : cohort}
                            onChange={(e) =>
                              editingUser
                                ? setEditingUser({
                                    ...editingUser,
                                    cohort: e.target.value,
                                  })
                                : setCohort(e.target.value)
                            }
                          />
                          <Input
                            label="Campus"
                            variant="bordered"
                            value={editingUser ? editingUser.campus : campus}
                            onChange={(e) =>
                              editingUser
                                ? setEditingUser({
                                    ...editingUser,
                                    campus: e.target.value,
                                  })
                                : setCampus(e.target.value)
                            }
                          />
                          <Input
                            label="Teacher"
                            variant="bordered"
                            value={editingUser ? editingUser.teacher : teacher}
                            onChange={(e) =>
                              editingUser
                                ? setEditingUser({
                                    ...editingUser,
                                    teacher: e.target.value,
                                  })
                                : setTeacher(e.target.value)
                            }
                          />
                          <Input
                            label="Manager"
                            variant="bordered"
                            value={editingUser ? editingUser.manager : manager}
                            onChange={(e) =>
                              editingUser
                                ? setEditingUser({
                                    ...editingUser,
                                    manager: e.target.value,
                                  })
                                : setManager(e.target.value)
                            }
                          />
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="danger"
                            variant="shadow"
                            onPress={() => closeModal(onClose)}
                          >
                            Close
                          </Button>
                          <Button
                            variant="shadow"
                            color="primary"
                            onClick={() => {
                              if (editingUser) {
                                editStudent(userEdit);
                              } else {
                                addStudent();
                              }
                              onClose();
                            }}
                          >
                            Submit
                          </Button>
                        </ModalFooter>
                      </div>
                    )}
                  </ModalContent>
                </Modal>
                <Spacer y={8} />
                <Button
                  isIconOnly
                  onPress={onOpen}
                  size="lg"
                  className=" absolute
                  main:right-12 main:bottom-12
                  medium:right-12 medium:bottom-12
                  small:right-12 small:bottom-12
                  bg-[#D3D3D3] shadow-lg rounded-full"
                >
                  <img src={addIcon} className="flex-shrink-0 w-[auto] h-8" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
