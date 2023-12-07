import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/kampus.png";
import { Button } from "@nextui-org/react";

function WebPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/landing");
  };

  return (
    <div
      id="promotional-page"
      className="bg-background bg-cover place-content-center"
    >
      <div className=" bg-gray-900/30 h-screen grid place-content-center">
        <div className="w-[50vw] text-left">
          <div>
            <img src={logo} alt="Kampus-logo" className="w-[100px] mb-2" />
          </div>
          <div>
            <h1 className=" text-7xl font-light mb-1">WELCOME TO</h1>
          </div>
          <h1 className=" text-7xl font-bold mb-2">KAMPUS</h1>
          <h2 className=" text-lg font-light ">STREAMLINING CAMPUS LIFE</h2>
          <h3 className=" text-lg font-light">FOR SUCCESS!</h3>
          {/*
            <p>
              Experience the future of campus management with an all-in-one app
              designed to simplify the lives of both students and staff.
              Navigate through your academic journey seamlessly, with tools
              tailored to enhance productivity and connectivity.
            </p>
            */}
        </div>
        <div className="w-[50%]"></div>
        <div className=" grid place-content-start">
          <Button
            className=" mt-3 h-12 text-md"
            color="primary"
            size="lg"
            onClick={handleGetStarted}
          >
            GET STARTED
          </Button>
        </div>
      </div>

      <div className="absolute bottom-3 right-6 font-light text-sm text-gray-200">
        <p>Kampus ® 2023 . All rights reserved</p>
      </div>
      {/*
        <div>
          <h1>Advantages</h1>
          <div>
            <div>
              <h2>Effortless Organization</h2>
              <p>
                Seamlessly manage your daily tasks with personalized to-do lists
                and a user-friendly notepad. Kampus ensures that students stay
                organized, never missing a deadline, while staff efficiently
                maintains records.
              </p>
            </div>
            <div>
              <h2>Enhanced Focus with Pomodoro</h2>
              <p>
                Boost productivity and time management with the integrated
                Pomodoro technique. Students can conquer assignments with
                focused study sessions, and staff can efficiently allocate time
                for administrative tasks.
              </p>
            </div>
            <div>
              <h2>Centralized Student Database</h2>
              <p>
                Streamline communication and record-keeping with a centralized
                student database. Staff can easily manage student information,
                add new members, and foster stronger connections within the
                campus community.
              </p>
            </div>
          </div>
        </div>
         */}
    </div>
  );
}

export default WebPage;
