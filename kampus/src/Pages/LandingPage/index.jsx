import { useNavigate } from "react-router-dom"
function LandingPage(){
    const navigate = useNavigate();

    const isStuddent = () => {
        localStorage.setItem("type_user", "student")
        navigate("/login")
    }

    const isStaff = () => {
        localStorage.setItem("type_user", "staff")
        navigate("/login")
    }


    return(
        <div id="landing-page">
            <h1>Welcome x!</h1>
            <button onClick={isStuddent}>Student</button>
            <button onClick={isStaff}>Staff</button>
        </div>
    )
}

export default LandingPage