import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URI } from "../config/index";

function Navbar() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const login = localStorage.getItem("user");
  const navigate = useNavigate();
  const logoutBtn = () => {
    localStorage.clear();
    navigate("/");
  };
  const getUserById = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URI}/api/v1/user/get_user/${login}`
      );
      if (data.success) {
        setName(data.user.username);
        setImage(data.user.image)
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserById();
  }, [login]);
  return (
    <>
      <div className="flex justify-between items-center bg-blue-600 text-white font-mono p-4">
        <div>
          {!login ? (
            <a href="/" className="text-xl font-bold">Blog App</a>
          ) : (
            <div className="flex items-center gap-4 text-xl font-bold">
              <img className="w-10 h-10 rounded-full" src={image} alt="" />
              <h1>{name}</h1>
            </div>
          )}
        </div>
        <div>
          {login && <ul className="flex gap-4">
            <li className="hover:underline hover:transition hover:ease-in-out hover: text-xl">
              <a href="/">Home</a>
            </li>
            <li className="hover:underline hover:transition hover:ease-in-out hover: text-xl">
              <a href="/create_blogs">Create Blogs</a>
            </li>
            <li className="hover:underline hover:transition hover:ease-in-out hover: text-xl">
              <a href="/my_blogs">My Blogs</a>
            </li>
          </ul>}
        </div>
        <div>
          <h1>
            {login ? (
              <button
                onClick={logoutBtn}
                className="bg-red-600 p-2 font-bold text-lg rounded-2xl hover:bg-transparent hover:border-2 hover:border-red-600"
              >
                Logout
              </button>
            ) : (
              <a
                href="/login"
                className="border-2 border-white p-2 font-bold text-lg rounded-2xl hover:p-3"
              >
                Login
              </a>
            )}
          </h1>
        </div>
      </div>
    </>
  );
}

export default Navbar;
