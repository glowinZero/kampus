import { useNavigate} from "react-router-dom"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Link} from "@nextui-org/react";
import {Spacer} from "@nextui-org/react";
import { AuthContext } from '../../Context/auth.context';
import axios from "axios"
import {useContext, useState} from 'react';

const API_URL = "http://localhost:5005";

function LandingPage(){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const {storeToken, authenticateUser} = useContext(AuthContext);

    const handleLoginSubmit = (e) =>{
        e.preventDefault();

        const requestBody = {email, password};

        axios.post(`${API_URL}/auth/login`, requestBody)
            .then((response)=>{
                storeToken(response.data.authToken);
                localStorage.setItem("LoggedIn", response.data.authToken)
                authenticateUser();
                navigate('/dashboard');
            })
            .catch((error)=>{
                const errorDescription = error.response.data.message;
                setError(errorDescription);
            })
    }

    const goToLoginPage = () =>{
        navigate ("/login")
    }

    return(
        <div id="landing-page" className="scale-200">
            <h1 className="[word-spacing:-100px] text-7xl font-thin">Welcome!</h1>
            <Spacer y={10} />
            <div>
            <Button onPress={goToLoginPage} size="lg" className="bg-[#D3D3D3] text-[#00072D] w-64 h-12 font-semibold shadow-lg">STAFF</Button>
            </div>
            <Spacer y={4} />
            <div>
            <Button onPress={onOpen} size="lg" className="w-64 bg-[#D3D3D3] text-[#00072D] font-semibold shadow-lg">STUDENT</Button>
                <Modal
                    classNames={{ size: "4xl", body: "py-6",backdrop: "bg-[#292f46]/50 backdrop-opacity-40 blur", base: "border-[#292f46] bg-white text-[#71717a]", header: "border-b-[1px] border-[#292f46]", footer: "border-t-[1px] border-[#292f46]", closeButton: "active:bg-white/10"}}
                    size="l"
                    backdrop="blur"
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="center">
                    <ModalContent>
                    {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                        <ModalBody>
                            <Input autoFocus label="Email" placeholder="Enter your email" variant="flat" value={email} onChange={(e)=> setEmail(e.target.value)} />
                            <Input label="Password" placeholder="Enter your password" type="password" variant="flat" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                            <div className="flex py-2 px-1 justify-between">
                            <Link color="primary" href="#" size="sm">
                                Forgot password?
                            </Link>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onClick={handleLoginSubmit} >
                                Sign in
                            </Button>
                        </ModalFooter>
                        </>
                    )}
                    </ModalContent>
                </Modal>
            </div>
                {error && <p>{error}</p>}
        </div>
    )
}

export default LandingPage;
