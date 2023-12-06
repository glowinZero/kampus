import { useNavigate } from "react-router-dom"
import logo from "../../assets/images/graduation.png"
import {
    Button
  } from "@nextui-org/react";

function WebPage(){
    const navigate = useNavigate();

    const handleGetStarted = () =>{
        navigate("/landing")
    }

    return (
      <div
        id="promotional-page"
        className="bg-background bg-cover place-content-center"
      >
        <div id="topbar">
          <img
            src={logo}
            alt="Kampus-logo"
            className="w-[100px] bg-white ml-3 mt-2"
          />
        </div>
        <div className=" bg-gray-900/30 h-screen grid place-content-center">
          <div className="w-[50vw] text-left">
            <h1 className=" text-7xl font-bold mb-1">WELCOME TO</h1>
            <h1 className=" text-7xl font-light mb-3">KAMPUS</h1>
            <h2 className=" text-xl font-semibold mb-1">
              Streamlining Campus Life
            </h2>
            <h3 className=" text-xl font-semibold">for Success!</h3>
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
              className=" mt-5"
              color="primary"
              size="lg"
              onClick={handleGetStarted}
            >
              GET STARTED
            </Button>
          </div>
        </div>

        <div className="absolute bottom-2 right-5 italic font-light text-gray-200">
          <p>Kampus @ 2023 | All rights reserved</p>
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

export default WebPage