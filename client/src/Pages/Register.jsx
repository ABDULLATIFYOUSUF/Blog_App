import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE_URI } from "../config";

function Register() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("/profile.png"); // Default image
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev); // toggle true/false
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      toast.error("Password must be strong");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("username", name);
      formData.append("email", email);
      formData.append("password", password);

      const { data } = await axios.post(
        `${BASE_URI}/api/v1/user/register`,
        formData
      );

      if (data.success) {
        toast.success("User Registered Successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error("Registration failed");
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="w-[90%] md:w-[40%] flex flex-col items-center mx-auto border border-blue-600 p-4 m-4 gap-4 rounded-2xl shadow-blue-600 shadow-lg">
          <h1 className="font-bold text-blue-600 text-2xl underline">Signup</h1>

          <div className="border-2 border-green-600 p-4 rounded-2xl m-2 w-full flex flex-col items-center gap-4">
            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              name="image"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />

            {/* Clickable image */}
            <img
              src={preview}
              alt="User"
              onClick={handleImageClick}
              className="w-44 h-44 rounded-full border-2 border-blue-600 p-2 mx-auto cursor-pointer object-cover"
            />

            {/* Username */}
            <input
              type="text"
              name="name"
              placeholder="Enter User Name...."
              className="border border-blue-600 p-4 rounded-2xl w-full"
              onChange={(e) => setName(e.target.value)}
            />

            {/* Email */}
            <input
              type="text"
              name="email"
              placeholder="Enter Your Email...."
              className="border border-blue-600 p-4 rounded-2xl w-full"
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password */}
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

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-600 p-4 rounded-2xl w-full text-white font-bold text-xl hover:text-blue-600 hover:bg-white hover:border-2 border-blue-600"
            >
              Submit
            </button>

            {/* Link to login */}
            <p className="text-xl">
              Already have an account?{" "}
              <a
                className="text-blue-600 font-bold hover:underline"
                href="/login"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
