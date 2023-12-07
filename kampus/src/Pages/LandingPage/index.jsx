import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Spacer,
} from "@nextui-org/react";
import { AuthContext } from "../../Context/auth.context";
import axios from "axios";
import { useContext, useState } from "react";
const API_URL = "https://kampus.adaptable.app";

function LandingPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        axios
          .get(`${API_URL}/auth/users`)
          .then((usersResponse) => {
            const users = usersResponse.data;

            const loggedInUserEmail = requestBody.email;
            const userWithEmail = users.find(
              (user) => user.email === loggedInUserEmail
            );
            if (userWithEmail) {
              const isStudent = userWithEmail.isStudent;

              if (!isStudent) {
                alert(
                  "You have a staff account. Please go to the staff login page"
                );
              } else {
                localStorage.setItem("Logged In", response.data.authToken);
                authenticateUser();
                navigate("/virtualtour");
              }
            }
          })
          .catch((usersError) => {
            console.error("Error fetching users:", usersError);
          });
      })
      .catch(() => {
        const errorDescription = error.response.data.message;
        setError(errorDescription);
      });
  };

  const goToLoginPage = () => {
    navigate("/login");
  };

  return (
    <div id="landing-page" className="scale-200">
      <h1 className="[word-spacing:-100px] text-7xl font-thin">Welcome!</h1>
      <Spacer y={10} />
      <div>
        <Button
          onPress={goToLoginPage}
          size="lg"
          className="bg-[#D3D3D3] text-[#00072D] w-64 h-12 font-semibold shadow-lg"
        >
          STAFF
        </Button>
      </div>
      <Spacer y={4} />
      <div>
        <Button
          onPress={onOpen}
          size="lg"
          className="w-64 bg-[#D3D3D3] text-[#00072D] font-semibold shadow-lg"
        >
          STUDENT
        </Button>
        <Modal
          classNames={{
            size: "5xl",
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
          size="L"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Log in
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus
                    label="Email"
                    placeholder="Enter your email"
                    variant="bordered"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    variant="bordered"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="solid" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    variant="solid"
                    onClick={handleLoginSubmit}
                  >
                    Log in
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}
export default LandingPage;
