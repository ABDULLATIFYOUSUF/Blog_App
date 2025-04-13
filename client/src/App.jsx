import React from "react";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { Toaster } from "react-hot-toast";
import CreateBlogs from "./Pages/CreateBlogs";
import BlogEdit from "./Pages/BlogEdit";
import MyBlogs from "./Pages/MyBlogs";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <div className="sticky top-0 z-10">
        <Navbar />
      </div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/create_blogs" element={<CreateBlogs />} />
          <Route path="/blog_edit/:id" element={<BlogEdit />} />
          <Route path="/my_blogs" element={<MyBlogs />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
