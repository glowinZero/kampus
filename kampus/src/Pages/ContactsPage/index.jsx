import { AuthContext } from "../../Context/auth.context";
import NavBar from "../../Components/Navbar/NavBar";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Spacer,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Card,
  CardBody,
} from "@nextui-org/react";

const API_URL = "https://kampus.adaptable.app";

function ContactsPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isLoggedIn, user } = useContext(AuthContext);
  const [loggedUser, setLoggedUser] = useState();
  // eslint-disable-next-line no-unused-vars
  const [isStudents, setIsStudents] = useState(true);
  const [users, setUsers] = useState([]);

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
          const filteredUsers = responseUsers.data.filter(
            (user) => !user.isStudent
          );

          setUsers(filteredUsers);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchData();
  }, [user, isLoggedIn]);

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
          <div id="dashboard-staff" className="w-screen">
            <NavBar className="w-[100%]" />
            <div className=" w-[91.5vw] h-[95vh] bg-gray-50 m-5 p-5 rounded-3xl overflow-auto scrollbar-hide overscroll-none scroll-smooth">
              <h1
                id="heading-staff-dashboard"
                className="font-semibold text-Color3 p-1"
              >
                STAFF
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
                        <p id="students-card-p">{elem.campus}</p>
                        <Spacer x={8} />
                        <p id="students-card-p">{elem.cohort}</p>
                        <Spacer x={8} />
                        <p id="role">{elem.role}</p>
                        <Spacer x={16} />
                      </div>
                      <div id="buttons-students-list"></div>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactsPage;
