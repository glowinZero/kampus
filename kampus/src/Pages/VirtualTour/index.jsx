import { useEffect, useState, useRef } from "react";
import backImgEntrance from "../../assets/images/entrance.jpg";
import backImgUx from "../../assets/images/sala-ux.jpg";
import backImgWeb from "../../assets/images/sala_web.jpg";
import backImgData from "../../assets/images/sala-data.jpg";
import backImgKitchen from "../../assets/images/kitchen.jpg";
import backImgLounge from "../../assets/images/sala-lazer.jpg";
import manager from "../../assets/images/T3.png"
import teacher1 from "../../assets/images/T2.png"
import teacher2 from "../../assets/images/T1.png"
import teacher3 from "../../assets/images/T4.png"
import { useNavigate } from "react-router-dom";
import audioEntrance from "../../assets/images/en-US-SaraNeural.wav"
import audioUX from "../../assets/images/en-US-JaneNeural.wav"
import audioWeb from "../../assets/images/en-US-BrianNeural.wav"
import audioData from "../../assets/images/en-US-AmberNeural.wav"
import audioKitchen from "../../assets/images/en-US-SaraNeural (1).wav"
import audioLounge from "../../assets/images/en-US-SaraNeural (2).wav"
import audioEnd from "../../assets/images/en-US-SaraNeural-end.wav"
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter,
} from "@nextui-org/react";
import { Typewriter } from 'react-simple-typewriter'

function VirtualTour() {
  const [tourStep, setTourStep] = useState(0);
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userLogged, setUserLogged] = useState(false);
  const typewriterRef = useRef();
  const tourStepContent = [
    ["Welcome to the heart of our campus! The entrance is the gateway to a vibrant learning experience. As you step through the doors, you will feel the energy of a community ready to explore, create, and grow together."],
    ["Immerse yourself in the art and science of user experience and interface design. Our UX/UI Classroom is a haven for creativity, where students craft user-centric solutions that seamlessly blend aesthetics with functionality."],
    ["Dive into the world of data in our state-of-the-art Data Analytics Classroom. Equipped with cutting-edge technology, this space iswhere students unravel the power of data to uncover insights and make informed decisions."],
    ["Enter the realm of coding and web development in our dynamic Web Dev Classroom. From HTML to JavaScript, this space is where students transform lines of code into interactive and visually stunning web applications."],
    ["Hungry for knowledge and a good meal? Our Kitchen is more than just a place to heat up your lunch; it is a hub of culinary delights and social interaction. Fuel your brain and body in this cozy space designed for shared meals and delightful conversations."],
    ["Kick back and relax in our Lounge, the ultimate chill-out zone on campus. This vibrant space is perfect for unwinding, socializing, and engaging in friendly soccer table matches. Whether you are catching up with friends or taking a break from your studies, the Lounge is the go-to spot."],
    ["Thanks for exploring our campus virtually! We hope you felt the vibrant energy of our learning community. See you on campus soon!"]
  ];

  const audioFiles = [
    audioEntrance,
    audioUX,
    audioWeb,
    audioData,
    audioKitchen,
    audioLounge,
    audioEnd
  ];

  const [audio] = useState(new Audio(audioFiles[tourStep]));

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      onOpen();
      setTimeout(() => {
        navigate("/landing");
      }, 3000);
    } else {
      setUserLogged(true);
    }
    setTourStep(0);
  }, [navigate]);

  const advanceTour = () => {
    audio.pause();
    audio.currentTime = 0;
    if (tourStep < tourStepContent.length - 1) {
      setTourStep(tourStep + 1);
      typewriterRef.current?.startTyping();
    } else {
      navigate("/dashboard");
    }
  };

  const playAudio = () => {
    audio.pause();
    audio.src = audioFiles[tourStep];
    audio.volume = 0.5;
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  };

  useEffect(() => {
    if (tourStep === 0) {
      playAudio();
    }
  }, [tourStep]);

  return (
    <div id="virtual-tour">
      {userLogged ? (
        <div>
            {tourStepContent.slice(0, tourStep + 1).map((stepContent, index) => (
              index === tourStep ? (
                <h1 key={index} className="p-5 font-semibold text-xl bg-mainColor-500 rounded-3xl">
                  <Typewriter words={stepContent} loop={1} ref={typewriterRef} typeSpeed={50} deleteSpeed={10}/>
                </h1>
              ) : null
            ))}
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
                  : tourStep === 6
                  && backImgEntrance
              }
              id="background-img"
              alt={`Step ${tourStep + 1}`}
            />

            <img
              src={
                tourStep === 0
                  ? manager
                  : tourStep === 1
                  ? teacher1
                  : tourStep === 2
                  ? teacher2
                  : tourStep === 3
                  ? teacher3
                  : tourStep === 4
                  ? manager
                  : tourStep === 5
                  ? manager
                  : tourStep === 6
                  && manager
              }
              id="background-img"
              style={{width: "40vw", height:"auto", position:"fixed", marginTop:"12vh"}}
              alt={`Step ${tourStep + 1}`}
            />
          <Button
            color="primary"
            onClick={tourStep === 6 ? ()=>{navigate("/dashboard"); } : advanceTour}
            id="tour-button"
          >
            {" "}
            Next
          </Button>
          <Button
            color="primary"
            onClick={playAudio}
            id="audio-button"
          >
            {" "}
            Play audio
          </Button>
        </div>
      ) : ( <div>
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
      )}
    </div>
  );
}

export default VirtualTour;
