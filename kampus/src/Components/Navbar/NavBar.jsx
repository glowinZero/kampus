import { Link, useNavigate } from "react-router-dom";
import dashIcon from "../../assets/images/dashboard.png"
import profileIcon from "../../assets/images/user.png"
import staffIcon from "../../assets/images/graduation.png"
import logoutIcon from "../../assets/images/leave.png"
import { AuthContext } from '../../Context/auth.context';
import { useContext, useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Card, CardBody} from "@nextui-org/react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function NavBar() {
  const [loggedUser, setLoggedUser] = useState()
  const {user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isStudents, setIsStudents] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("authToken")

    if(!token || !user ){
      onOpen()
    
      setTimeout(() => {
        navigate("/")
      }, 3000);    
    }
    
    setLoggedUser(user)

    const fetchData = async () => {
      const getToken = localStorage.getItem("authToken");
  
      if (getToken && user) {
        try {
          const idUser = user._id;
  
          const responseUser = await axios.get(`${API_URL}/auth/users/${idUser}`);
          console.log(responseUser.data.isStudent);
          setIsStudents(responseUser.data.isStudent);
          setLoggedUser(responseUser.data);

        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };
  
    fetchData();
  }, [])

  useEffect(() => {
    console.log("isStudent?", isStudents);
  }, [loggedUser]);

  const logout = () =>{
    logOut();
    setLoggedUser("")
    navigate("/")
  }

  return (
    <div>
      {!loggedUser ? (<div>
        <Modal
          classNames={{
            size: "4xl", body: "py-6", backdrop: "bg-[#292f46]/50 backdrop-opacity-40 blur", base: "border-[#292f46] bg-white text-[#71717a]", header: "border-b-[1px] border-[#292f46]", footer: "border-t-[1px] border-[#292f46]", closeButton: "active:bg-white/10",}}
          size="2xl"
          backdrop="blur"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center">
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
          </div>) : (<div>{isStudents ? (<Card  style={{ width: "5vw",  marginLeft:"-48vw", marginTop:"5vh", height:"90vh", display: 'flex', alignItems:"", flexDirection: 'row', position: "absolute", zIndex:"3"}}>
            <CardBody style={{width: "100%", display:"flex", justifyContent: "space-between"}}>
              <div>
                <Button id="button-navbar" style={{width: "1vw"}}>
                  <Link style={{width: "fit-content"}} to="/dashboard"><img src={dashIcon} style={{width: "3vw", marginLeft: "-1.2vw"}}/></Link>
                </Button>
                <Button id="button-navbar" style={{width: "1vw"}}>
                  <Link style={{width: "fit-content"}} to="/profile"><img src={profileIcon} style={{width: "3vw", marginLeft: "-1.2vw"}}/></Link>
                </Button>
                <Button id="button-navbar" style={{width: "1vw"}}>
                  <Link style={{width: "fit-content"}} to="/"><img src={staffIcon} style={{width: "3vw", marginLeft: "-1.2vw"}}/></Link>
                </Button>
              </div>
              <div>
                <Button id="button-navbar" onPress={logout} style={{width: "1vw"}}>
                  <Link style={{width: "fit-content"}} to="/"><img src={logoutIcon} style={{width: "3vw", marginLeft: "-1.2vw"}}/></Link>
                </Button>
              </div>
            </CardBody>
          </Card>) : (<Card  style={{ width: "5vw",  marginLeft:"-48vw", marginTop:"5vh", height:"90vh", display: 'flex', alignItems:"", flexDirection: 'row', position: "absolute", zIndex:"3"}}>
            <CardBody style={{width: "100%", display:"flex", justifyContent: "space-between"}}>
              <div>
                <Button id="button-navbar" style={{width: "1vw"}}>
                  <Link style={{width: "fit-content"}} to="/dashboard"><img src={dashIcon} style={{width: "3vw", marginLeft: "-1.2vw"}}/></Link>
                </Button>
                <Button id="button-navbar" style={{width: "1vw"}}>
                  <Link style={{width: "fit-content"}} to="/profile"><img src={profileIcon} style={{width: "3vw", marginLeft: "-1.2vw"}}/></Link>
                </Button>
              </div>
              <div>
                <Button id="button-navbar" onPress={logout} style={{width: "1vw"}}>
                  <Link style={{width: "fit-content"}} to="/"><img src={logoutIcon} style={{width: "3vw", marginLeft: "-1.2vw"}}/></Link>
                </Button>
              </div>
            </CardBody>
          </Card>
              )}
        </div>
      )}
    </div>
  );
}

export default NavBar
