import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URI } from "../config";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev); // toggle true/false
  };
  const login = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_URI}/api/v1/user/login`, {
        email,
        password,
      });
      if (data.success) {
        localStorage.setItem("user", data.user._id);
        toast.success("User Login Successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <div>
        <div className="border-2 w-[90%] md:w-[40%] mx-auto my-4 p-5 shadow-2xl shadow-blue-600 border-blue-600 rounded-2xl">
          <form onSubmit={login} autoComplete="off">
            <div className="border-2 border-green-600 p-5 rounded-2xl">
              <h1 className="text-blue-600 text-center underline my-4 font-bold text-3xl">Login</h1>
              <div>
                <input className="my-4 border border-blue-600 p-4 pr-16 rounded-2xl w-full"
                  type="text"
                  name="email"
                  placeholder="Enter Your Email...."
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="relative w-full my-4">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Your Password..."
                className="border border-blue-600 p-4 pr-16 rounded-2xl w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={handleShowPassword}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-blue-600 underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
                <button className="bg-blue-600 text-white my-4 hover:border hover:border-blue-600 hover:bg-transparent hover:text-blue-600 p-4 rounded-2xl w-full" type="submit">Login</button>
                <p className="text-center my-4">
                  Don't have account? <a className="text-blue-600 font-bold text-lg" href="/register">Signup</a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
