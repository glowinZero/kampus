import { useNavigate } from "react-router-dom"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import {MailIcon} from '../../Components/MailIcon';
import {LockIcon} from '../../Components/LockIcon';
import React from "react";
function LandingPage(){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const navigate = useNavigate();

    const isStudent = () => {
        localStorage.setItem("type_user", "student")
        navigate("/login")
    }

    const isStaff = () => {
        localStorage.setItem("type_user", "staff")
        navigate("/login")
    }


    return(
        <div id="landing-page">
            <h1>Welcome!</h1>
            <Button onPress={onOpen} color="secondary">STUDENT</Button>
                <Modal
                    classNames={{
                        size: "4xl",
                        autoFocus: "border-blue-500",
                        body: "py-6",
                        backdrop: "bg-[#292f46]/50 backdrop-opacity-40 blur",
                        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                        header: "border-b-[1px] border-[#292f46]",
                        footer: "border-t-[1px] border-[#292f46]",
                        closeButton: "hover:bg-white/5 active:bg-white/10",
                    }}
                    size="3xl"
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="center">
                    <ModalContent color="secondary">
                    {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                        <ModalBody>
                            <Input
                            autoFocus
                            label="Email"
                            placeholder="Enter your email"
                            variant="bordered"
                            />
                            <Input
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            variant="bordered"
                            />
                            <div className="flex py-2 px-1 justify-between">
                            <Checkbox
                                classNames={{
                                label: "text-small",
                                }}>
                                Remember me
                            </Checkbox>
                            <Link color="primary" href="#" size="sm">
                                Forgot password?
                            </Link>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                            Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                            Sign in
                            </Button>
                        </ModalFooter>
                        </>
                    )}
                    </ModalContent>
                </Modal>
            <div style={{display: 'flex'}}>
                <Button color="success" onClick={isStudent} isLoading>STUDENT</Button>
                <Button onClick={isStaff}>STAFF</Button>
            </div>
        </div>
    )
}

export default LandingPage