import { Link, useNavigate } from "react-router-dom";
import dashIcon from "../../assets/images/dashboard.png";
import profileIcon from "../../assets/images/user.png";
import mapIcon from "../../assets/images/map.png";
import staffIcon from "../../assets/images/staff.png";
import logoutIcon from "../../assets/images/logout.png";
import { AuthContext } from "../../Context/auth.context";
import { useContext, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";

const API_URL = "https://kampus.adaptable.app";

function NavBar() {
  const [loggedUser, setLoggedUser] = useState();
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isStudents, setIsStudents] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token || !user) {
      onOpen();

      setTimeout(() => {
        navigate("/");
      }, 3000);
    }

    setLoggedUser(user);

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
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("isStudent?", isStudents);
  }, [loggedUser]);

  const logout = () => {
    logOut();
    setLoggedUser("");
    localStorage.removeItem("Logged In");
    navigate("/landing");
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
        <div>
          {isStudents ? (
            <aside
              id="default-sidebar"
              className="fixed top-5 left-5 bottom-5 z-40 w-[5vw] h-[95vh]"
              aria-label="Sidebar"
            >
              <div className="h-full py-2 overflow-x-hidden bg-gray-50 rounded-xl">
                <ul>
                  <li>
                    <Button id="button-navbar" className="mt-4">
                      <Link to="/dashboard">
                        <img
                          src={dashIcon}
                          className="flex-shrink-0 w-[auto] h-6"
                        />
                      </Link>
                    </Button>
                  </li>
                  <li>
                    <Button id="button-navbar" className=" mt-6">
                      <Link to="/profile">
                        <img
                          src={profileIcon}
                          className="flex-shrink-0 w-[auto] h-6"
                        />
                      </Link>
                    </Button>
                    <li>
                      <Button id="button-navbar" className=" mt-6">
                        <Link to="/virtualTour">
                          <img
                            src={staffIcon}
                            className="flex-shrink-0 w-[auto] h-8"
                          />
                        </Link>
                      </Button>
                    </li>
                    <li>
                      <Button id="button-navbar" className=" mt-6">
                        <Link to="/virtualTour">
                          <img
                            src={mapIcon}
                            className="flex-shrink-0 w-[auto] h-6"
                          />
                        </Link>
                      </Button>
                    </li>
                  </li>
                  <li>
                    <Button
                      id="button-navbar"
                      onPress={logout}
                      className="absolute bottom-8 left-0"
                    >
                      <Link to="/">
                        <img
                          src={logoutIcon}
                          className="flex-shrink-0 w-[auto] h-8"
                        />
                      </Link>
                    </Button>
                  </li>
                </ul>
              </div>
            </aside>
          ) : (
            <aside
              id="default-sidebar"
              className="absolute top-5 left-5 bottom-5 rounded-full"
            >
              <div className="h-full py-2 overflow-y-auto bg-gray-50 rounded-xl">
                <ul>
                  <li>
                    <Button id="button-navbar" className="mt-4">
                      <Link to="/dashboard">
                        <img
                          src={dashIcon}
                          className="flex-shrink-0 w-[auto] h-6"
                        />
                      </Link>
                    </Button>
                  </li>
                  <li>
                    <Button id="button-navbar" className=" mt-6">
                      <Link to="/profile">
                        <img
                          src={profileIcon}
                          className="flex-shrink-0 w-[auto] h-6"
                        />
                      </Link>
                    </Button>
                  </li>
                  <li>
                    <Button
                      id="button-navbar"
                      onPress={logout}
                      className="absolute bottom-8 left-0"
                    >
                      <Link to="/">
                        <img
                          src={logoutIcon}
                          className="flex-shrink-0 w-[auto] h-8"
                        />
                      </Link>
                    </Button>
                  </li>
                </ul>
              </div>
            </aside>
          )}
        </div>
      )}
    </div>
  );
}

export default NavBar;
