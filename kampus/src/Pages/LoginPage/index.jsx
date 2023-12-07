import { useContext, useState } from "react";
import { AuthContext } from "../../Context/auth.context";
import axios from "axios";
import { Input } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const API_URL = "https://kampus.adaptable.app";

function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [isStudent, setIsStudent] = useState(false);
  const [error, setError] = useState();
  const [authenticationStep, setAuthenticationStep] = useState("login");
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        axios.get(`${API_URL}/auth/users`).then((usersResponse) => {
          const users = usersResponse.data;

          const loggedInUserEmail = requestBody.email;
          const userWithEmail = users.find(user => user.email === loggedInUserEmail);
          if (userWithEmail) {
            // Check the isStudent property for the logged-in user
            const isStudent = userWithEmail.isStudent;

            // Perform logic based on the value of isStudent
            if (isStudent) {
              alert('You need to have a staff account to login this page');
            } else {
              localStorage.setItem("Logged In", response.data.authToken);
              authenticateUser();
              navigate("/dashboard");
            }
          }
        })
        .catch((usersError) => {
          console.error('Error fetching users:', usersError);
        });
    })
      .catch(() => {
        const errorDescription = error.response.data.message;
        setError(errorDescription);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsStudent(false);
    const requestBody = { email, password, firstName, lastName, isStudent };

    if (
      email === "" ||
      password === "" ||
      firstName === "" ||
      lastName === ""
    ) {
      alert("Provide all fields in order to create a new Student");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("Provide a valid email");
      return;
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      alert("Password must have at least 6 characters and contain 1 lowercase letter, 1 uppercase letter, 1 number");
      return;
    }

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then(() => {
        return axios.post(`${API_URL}/auth/login`, requestBody);
      })
      .then((response) => {
        storeToken(response.data.authToken);
        localStorage.setItem("Logged In", response.data.authToken);
        authenticateUser();
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorDescription =
          error.response.data.message ||
          "Failed to create a Student. Please try again.";
        setError(errorDescription);
      });
  };

  return (
    <section className="flex bg-white h-[100vh] w-[100vw]">
      <div className="w-[60%] bg-blue-900/95 bg-loginPageBackground grid place-content-center bg-cover"></div>
      <div className="flex-1 grid place-content-center text-black">
        {authenticationStep === "login" && (
          <div className="w-80">
            <h2 className="text-4xl text-left font-bold mb-1">Hello!</h2>
            <h4 className="text-xl text-left font-medium mb-5">Welcome back</h4>
            <Input
              autoFocus
              size="lg"
              label="Email"
              variant="flat"
              className=" mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              size="lg"
              className="mb-5"
              label="Password"
              type="password"
              variant="flat"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              className="w-full"
              color="primary"
              onClick={handleLoginSubmit}
            >
              Login
            </Button>
            <Spacer y={5} />
            <div className="flex w-5/6">
              <p className="mr-3 ">Do not have a account?</p>
              <Link
                color="primary"
                href="#"
                onClick={() => setAuthenticationStep("signup")}
              >
                Sign up
              </Link>
            </div>
          </div>
        )}
        {authenticationStep === "signup" && (
          <div className="w-80">
            <h2 className="text-4xl text-left font-bold mb-1">Hi!</h2>
            <h4 className="text-xl text-left font-medium mb-5">
              Sign Up to Get Started
            </h4>
            <Input
              autoFocus
              size="lg"
              label="First Name"
              variant="flat"
              className=" mb-3"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <Input
              size="lg"
              label="Last Name"
              variant="flat"
              className=" mb-3"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <Input
              size="lg"
              label="Email"
              variant="flat"
              className=" mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              size="lg"
              className="mb-5"
              label="Password"
              type="password"
              variant="flat"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button className="w-full" color="primary" onClick={handleRegister}>
              Register
            </Button>
            <Spacer y={5} />
            <div className="flex w-5/6">
              <p className="mr-3 ">Already have a account?</p>
              <Link
                color="primary"
                href="#"
                onClick={() => setAuthenticationStep("login")}
              >
                Log In
              </Link>
            </div>
          </div>
        )}
        <Button
          className=" absolute bottom-5 right-5 mt-5"
          color="default"
          onClick={() => {
            navigate("/landing");
          }}
        >
          Back
        </Button>
      </div>
    </section>
  );
}

export default LoginPage;
