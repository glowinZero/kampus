import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/Navbar/NavBar";
import { AuthContext } from "../../Context/auth.context";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import {
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
  Spacer,
} from "@nextui-org/react";

const API_URL = "https://kampus.adaptable.app";

function ProfilePage() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isLoggedIn, user } = useContext(AuthContext);
  const [loggedUser, setLoggedUser] = useState();
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

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

          const responseUser = await axios.get(`${API_URL}/auth/users/${idUser}`);
          setLoggedUser(responseUser.data);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchData();
  }, [user, isLoggedIn]);

  const editUser = (userEdit) => {
    const isStudent = false;
    const password = loggedUser.password;
    const cohort = loggedUser.cohort;
    const campus = loggedUser.campus;
    const manager = "";
    const teacher = "";

    const updatedFields = {
      ...(email !== undefined && {email: email !== "" ? email : loggedUser.email,}),
      password,
      ...(firstName !== undefined && {firstName: firstName !== "" ? firstName : loggedUser.firstName,}),
      ...(lastName !== undefined && {lastName: lastName !== "" ? lastName : loggedUser.lastName,}),
      cohort,
      campus,
      manager,
      teacher,
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

    axios.put(`${API_URL}/auth/users/${userEdit._id}`, updatedFields)
      .then(() => {
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
          console.log(responseUser.data.isStudent);
          setLoggedUser(responseUser.data);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchData();
  };

  const resetProfile = () => {
    const idUser = user._id;
    axios.get(`${API_URL}/auth/users/${idUser}`)
      .then((response) => {
        console.log(response.data.isStudent);
        setLoggedUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  };

  return (
    <div>
      {!loggedUser ? (
        <div>
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
                  <ModalHeader className="flex flex-col gap-1">
                    Log in
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
        </div>
      ) : (
        <div id="dashboard-staff" className="w-screen">
          <NavBar />
          <div className=" w-[90vw] h-[95vh] bg-gray-400 m-5 p-5 rounded-3xl">
            <h1 id="heading-profile-page" className="font-semibold p-1">
              Hi Profile Page
            </h1>
            <div>
              <Spacer y={8} />
              <Card>
                <CardBody>
                  <Input
                    type="string"
                    label="First Name"
                    placeholder={loggedUser.firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                  <Input
                    type="string"
                    label="Last Name"
                    placeholder={loggedUser.lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                  <Input
                    type="email"
                    label="email"
                    placeholder={loggedUser.email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <Input
                    label="Password"
                    type="password"
                    variant="flat"
                    disabled="true"
                    value={loggedUser.password}
                    readOnly
                    style={{ color: "Gainsboro" }}
                  />
                  <Input
                    type="cohort"
                    label="Cohort"
                    placeholder={loggedUser.cohort}
                    readOnly
                    style={{ color: "Gainsboro" }}
                  >
                    {loggedUser.cohort}
                  </Input>
                  <Input
                    type="campus"
                    label="Campus"
                    placeholder={loggedUser.campus}
                    readOnly
                    style={{ color: "Gainsboro" }}
                  >
                    {loggedUser.campus}
                  </Input>
                </CardBody>
              </Card>
              <div className="flex row justify-center mt-5">
                <Button color="danger" variant="flat" onPress={resetProfile}>
                  Cancel
                </Button>
                <Spacer x={5} />
                <Button color="primary" onClick={editUser}>
                  Save changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
