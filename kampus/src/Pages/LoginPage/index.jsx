import { useContext, useState } from "react";
import { AuthContext } from "../../Context/auth.context";
import axios from "axios";
import { Input } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [authenticationStep, setAuthenticationStep] = useState("login");

  const navigate = useNavigate();

  // use shared functions provided by AuthContext
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        localStorage.setItem("Logged In", response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setError(errorDescription);
      });
  };

  return (
    <section className="flex bg-white h-[100vh] w-[100vw]">
      <div
        style={{
          backgroundImage:
            "url(https://www.brookings.edu/wp-content/uploads/2020/05/empty-classroom_elementary-school-middle-school-high-school.jpg?w=1500)",
        }}
        className="w-[60%] bg-blue-900 grid place-content-center bg-cover"
      ></div>
      <div className="flex-1 grid place-content-center text-black">
        {authenticationStep === "login" && (
          <div className="w-80">
            <h2 className="text-4xl text-left font-bold mb-1">Hello!</h2>
            <h4 className="text-xl text-left font-medium mb-5">Welcome back</h4>
            <Input
              autoFocus
              size="sm"
              label="Email"
              variant="flat"
              className=" mb-3"
            />
            <Input
              size="sm"
              className="mb-5"
              label="Password"
              type="password"
              variant="flat"
            />
            <Button className="w-full" color="primary">
              Login
            </Button>
            <Spacer y={5} />
            <div className="flex w-5/6">
              <p className="mr-3 ">Don't have a account?</p>
              <Link
                color="primary"
                href="#"
                size="sm"
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
              size="sm"
              label="Username"
              variant="flat"
              className=" mb-3"
            />
            <Input size="sm" label="Email" variant="flat" className=" mb-3" />
            <Input
              size="sm"
              className="mb-5"
              label="Password"
              type="password"
              variant="flat"
            />
            <Button className="w-full" color="primary">
              Register
            </Button>
            <Spacer y={5} />
            <div className="flex w-5/6">
              <p className="mr-3 ">Already have a account?</p>
              <Link
                color="primary"
                href="#"
                size="sm"
                onClick={() => setAuthenticationStep("login")}
              >
                Log In
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
  {
    /*
        <form onSubmit = {handleLoginSubmit}>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
            {error && <p>{error}</p>}
        </form>
        */
  }

  {
    /*
        <section className="grid grid-cols-1 gap-0 lg:grid-cols-12 h-full">
            <div class="w-full col-span-1 p-4 mx-auto mt-6 lg:col-span-8 xl:p-12 md:w-2/4">
                <h1 class="mt-6 mb-4 text-xl font-light text-left text-gray-800">Log in to your account</h1>
                <form class="pb-1 space-y-4">
                <label class="block">
                    <span class="block mb-1 text-xs font-medium text-gray-700">Your Email</span>
                    <input class="form-input" type="email" placeholder="Ex. james@bond.com" inputmode="email" required />
                </label>
                <label class="block">
                    <span class="block mb-1 text-xs font-medium text-gray-700">Your Password</span>
                    <input class="form-input" type="password" placeholder="••••••••" required />
                </label>
                <div class="flex items-center justify-between">
                    <label class="flex items-center">
                    <input type="checkbox" class="form-checkbox" />
                    <span class="block ml-2 text-xs font-medium text-gray-700 cursor-pointer">Remember me</span>
                    </label>
                    <input type="submit" class="btn btn-primary" value="Login" />
                </div>
                </form>
                <div class="my-6 space-y-2">
                <p class="text-xs text-gray-600">
                    Don't have an account?
                    <a href="#" class="text-purple-700 hover:text-black">Create an account</a>
                </p>
                <a href="#" class="block text-xs text-purple-700 hover:text-black">Forgot password?</a>
                <a href="#" class="block text-xs text-purple-700 hover:text-black">Privacy & Terms</a>
                </div>
            </div>
            <div class="col-span-1 lg:col-span-4">
                <img
                src="https://images.unsplash.com/photo-1531548731165-c6ae86ff6491?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
                alt="3 women looking at a laptop"
                class="object-cover w-full h-64 min-h-full bg-gray-100"
                loading="lazy"
                />
            </div>
            </section>*/
  }
}

export default LoginPage;
