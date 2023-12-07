import { useNavigate } from "react-router-dom"
import logo from "../../assets/images/graduation.png"
import { Button } from "@nextui-org/react";

function WebPage(){
    const navigate = useNavigate();

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
          </div>
          <div className="w-[50%]"></div>
          <div className=" grid place-content-start">
            <Button
              className=" mt-5"
              color="primary"
              size="lg"
              onClick={()=>{navigate("/landing")}}
            >
              GET STARTED
            </Button>
          </div>
        </div>
        <div className="absolute bottom-2 right-5 italic font-light text-gray-200">
          <p>Kampus @ 2023 | All rights reserved</p>
        </div>
      </div>
    );
}

export default WebPage