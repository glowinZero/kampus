import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import React from "react";
function LandingPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  /*
    const isStudent = () => {
        localStorage.setItem("type_user", "student")
        navigate("/login")
    }
    */

  const isStaff = () => {
    localStorage.setItem("type_user", "staff");
    navigate("/login");
  };

  return (
    <div id="landing-page" className="scale-200">
      <h1 className="[word-spacing:-100px] text-7xl font-light">Welcome!</h1>
      <Spacer y={10} />
      <div>
        <Button
          onPress={onOpen}
          size="lg"
          className="bg-[#D3D3D3] text-[#00072D] w-64 h-12 font-semibold shadow-lg"
        >
          STUDENT
        </Button>
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
          size="l"
          backdrop="blur"
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
                    variant="flat"
                  />
                  <Input
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    variant="flat"
                  />
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
      </div>
      <Spacer y={4} />

      <Button
        onClick={isStaff}
        size="lg"
        className="w-64 bg-[#D3D3D3] text-[#00072D] font-semibold shadow-lg"
      >
        STAFF
      </Button>
    </div>
  );
}

export default LandingPage;
