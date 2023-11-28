import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const API_URL = "http://localhost:5005";

function LoginPage(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState(undefined);
    const user = localStorage.getItem("type_user");
    //const { storeToken, authenticateUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = (e) =>{
        e.preventDefault();
        const requestBody = { email, password };

        axios.post(`${API_URL}/auth/login`, requestBody).then((response) => {

        console.log("JWT token", response.data.authToken);
        //storeToken(response.data.authToken);
        //authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
    }

    return(
        <div>
            <h1>Hi {user}</h1>
            <form onSubmit={handleLogin}>
                <label>Email <input type="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input></label>
                <label>Password <input type="email" name="email" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input></label>
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    )
}

export default LoginPage