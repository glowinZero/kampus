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
            <h1>Welcome to the heart of our campus! The entrance is the gateway to a vibrant learning experience. As you step through the doors, you will feel the energy of a community ready to explore, create, and grow together.</h1>
          ) : tourStep === 1 ? (
            <h1>Dive into the world of data in our state-of-the-art Data Analytics Classroom. Equipped with cutting-edge technology, this space is where students unravel the power of data to uncover insights and make informed decisions.</h1>
          ) : tourStep === 2 ? (
            <h1>Immerse yourself in the art and science of user experience and interface design. Our UX/UI Classroom is a haven for creativity, where students craft user-centric solutions that seamlessly blend aesthetics with functionality.</h1>
          ) : tourStep === 3 ? (
            <h1>Enter the realm of coding and web development in our dynamic Web Dev Classroom. From HTML to JavaScript, this space is where students transform lines of code into interactive and visually stunning web applications.</h1>
          ) : tourStep === 4 ? (
            <h1>Hungry for knowledge and a good meal? Our Kitchen is more than just a place to heat up your lunch; it is a hub of culinary delights and social interaction. Fuel your brain and body in this cozy space designed for shared meals and delightful conversations.</h1>
          ) : tourStep === 5 ? (
            <h1>Kick back and relax in our Lounge, the ultimate chill-out zone on campus. This vibrant space is perfect for unwinding, socializing, and engaging in friendly soccer table matches. Whether you are catching up with friends or taking a break from your studies, the Lounge is the go-to spot for leisure and camaraderie.</h1>
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
