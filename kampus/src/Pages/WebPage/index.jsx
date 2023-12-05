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

    return(
        <div id="promotional-page">
            <div id="topbar">
                <img src={logo} alt="Kampus-logo" style={{width:"3vw"}}/>
                <Button onClick={handleGetStarted}>Get started</Button>
            </div>
            <div id="promotional-headings">
                <h1>Welcome to Kampus: Streamlining Campus Life for Success!</h1>
                <p>Experience the future of campus management with an all-in-one app designed to simplify the lives of both students and staff. Navigate through your academic journey seamlessly, with tools tailored to enhance productivity and connectivity.</p>
            </div>
            <Button onClick={handleGetStarted}>Get started</Button>
            <div>
                <h1>Advantages</h1>
                <div>
                    <div>
                        <h2>Effortless Organization</h2>
                        <p>Seamlessly manage your daily tasks with personalized to-do lists and a user-friendly notepad. Kampus ensures that students stay organized, never missing a deadline, while staff efficiently maintains records.</p>
                    </div>
                    <div>
                        <h2>Enhanced Focus with Pomodoro</h2>
                        <p>Boost productivity and time management with the integrated Pomodoro technique. Students can conquer assignments with focused study sessions, and staff can efficiently allocate time for administrative tasks.</p>
                    </div>
                    <div>
                        <h2>Centralized Student Database</h2>
                        <p>Streamline communication and record-keeping with a centralized student database. Staff can easily manage student information, add new members, and foster stronger connections within the campus community.</p>
                    </div>
                </div>
            </div>
            <div>
                <p>Kampus @ 2023 | All rights reserved</p>
            </div>
        </div>
    )
}

export default WebPage