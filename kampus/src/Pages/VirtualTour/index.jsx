import { useEffect, useState } from "react";
import backImgEntrance from "../../assets/images/AirBnB-Dublin_EdReeve-09.jpg";
import backImgUx from "../../assets/images/NBBJ_NYC-4547_SeanAirhart_large.jpg";
import backImgWeb from "../../assets/images/Hi Res Office.jpg";
import backImgData from "../../assets/images/modern-office-with-the-city-view.jpg";
import backImgKitchen from "../../assets/images/Private-Office-Furniture-1-1120x445.jpeg";
import backImgLounge from "../../assets/images/vmly-amp-r-offices-bogota-11-700x467-compact.jpg";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";

function VirtualTour() {
  const [tourStep, setTourStep] = useState(0);
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setUserLogged(true);

    if (!token) {
      onOpen();
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
    setTourStep(0);
  }, [navigate]);

  const advanceTour = () => {
    setTourStep(tourStep + 1);
    console.log(tourStep);
  };

  const navigatePortal = () => {
    navigate("/dashboard");
  };

  return (
    <div id="virtual-tour">
      {userLogged ? (
        <>
          {tourStep === 0 ? (
            <h1>Slide 1</h1>
          ) : tourStep === 1 ? (
            <h1>slide 2 </h1>
          ) : tourStep === 2 ? (
            <h1>slide 3 </h1>
          ) : tourStep === 3 ? (
            <h1>slide 4 </h1>
          ) : tourStep === 4 ? (
            <h1>slide 5 </h1>
          ) : tourStep === 5 ? (
            <h1>slide 6 </h1>
          ) : (
            <h1>final slide </h1>
          )}
          <img
            src={
              tourStep === 0
                ? backImgEntrance
                : tourStep === 1
                ? backImgUx
                : tourStep === 2
                ? backImgWeb
                : tourStep === 3
                ? backImgData
                : tourStep === 4
                ? backImgKitchen
                : tourStep === 5
                ? backImgLounge
                : backImgEntrance
            }
            id="background-img"
          ></img>
          <button
            onClick={tourStep === 5 ? navigatePortal : advanceTour}
            id="tour-button"
          >
            {" "}
            Next
          </button>
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
              {() => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Log in
                  </ModalHeader>
                  <ModalBody>
                    <p>User not Logged in</p>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      ) : (
        <img src="Become part of us!" />
      )}
    </div>
  );
}

export default VirtualTour;
